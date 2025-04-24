/* eslint-disable @next/next/no-img-element */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { createClient } from "next-sanity"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import slugify from "slugify"
import { toast } from "sonner"
import { MarkdownEditor } from "./markdown-editor"

// Add this import for the markdown editor styles
import "@uiw/react-markdown-preview/markdown.css"
import "@uiw/react-md-editor/markdown-editor.css"

// Sanity client configuration
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2023-05-03",
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

// Form validation schema based on the Sanity schema
const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters")
        .max(160, "Description must not exceed 160 characters"),
    category: z
        .string()
        .min(2, "Category must be at least 2 characters")
        .max(20, "Category must not exceed 20 characters"),
    mainImage: z.string().url("Please enter a valid URL"),
    content: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CreatePostForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            mainImage: "",
            content: "",
        },
    })

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true)

        try {
            // Generate a slug from the title
            const slug = slugify(values.title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true,      // convert to lower case, defaults to `false`
                strict: false,     // strip special characters except replacement, defaults to `false`
                locale: 'vi',      // language code of the locale to use
                trim: true         // trim leading and trailing replacement chars, defaults to `true`
            })

            // Create the post document in Sanity
            await client.create({
                _type: "post",
                title: values.title,
                slug: { current: slug },
                description: values.description,
                category: values.category,
                mainImage: values.mainImage,
                content: values.content,
                // The author will be set to the current user, this is a placeholder
                author: {
                    _type: "reference",
                    _ref: "current-user-id", // This should be replaced with the actual user ID
                },
            })

            toast(
                "Post created successfully", {
                description: "Your post has been published.",
            })

            // Redirect to the post page
            router.push(`/posts/${slug}`)
        } catch (error) {
            console.error("Error creating post:", error)
            toast.error(
                "Something went wrong", {
                description: "Your post couldn't be created. Please try again.",
            }
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter post title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Brief description of your post (20-160 characters)"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>This will be displayed as a preview of your post.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Technology, Business, Design" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="mainImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Featured Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormDescription>Provide a URL to an image that represents your post.</FormDescription>
                            {field.value && (
                                <div className="mt-2 overflow-hidden rounded-md border">
                                    <img
                                        src={field.value || "/placeholder.svg"}
                                        alt="Featured image preview"
                                        className="h-48 w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "/placeholder.svg?height=192&width=384"
                                            e.currentTarget.alt = "Invalid image URL"
                                        }}
                                    />
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <MarkdownEditor value={field.value || ""} onChange={field.onChange} />
                            </FormControl>
                            <FormDescription>
                                Use Markdown to format your content. You can use headings, lists, links, and more.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Create Post"
                    )}
                </Button>
            </form>
        </Form>
    )
}
