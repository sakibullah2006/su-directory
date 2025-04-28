/* eslint-disable @next/next/no-img-element */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { MarkdownEditor } from "./markdown-editor"

// Add this import for the markdown editor styles
import { createPost } from "@/lib/db-actions"
import { slugifyTitle } from "@/lib/utils"
import { CreateFormValues, createFormSchema } from "@/lib/validation"
import "@uiw/react-markdown-preview/markdown.css"
import "@uiw/react-md-editor/markdown-editor.css"



export default function CreatePostForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<CreateFormValues>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            mainImage: "",
            content: "",
        },
    })

    async function onSubmit(values: CreateFormValues) {
        setIsSubmitting(true)

        try {
            // Generate a slug from the title
            const slug = slugifyTitle(values.title as string)


            const result = await createPost({ fromData: values })
            if (result.status === "SUCCESS") {
                toast(
                    "Post created successfully", {
                    description: "Post creation done",
                })

                // Redirect to the post page`
                router.push(`/startup/${slug}`)
            }

            return result;
        } catch (error) {
            console.error("Error creating post:", error)
            toast.error(
                "Something went wrong", {
                description: "Your post couldn't be created. Please try again.",
            }
            )
            return {
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
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
                                        className="h-48 w-full object-contain"
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
