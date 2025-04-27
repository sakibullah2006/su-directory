import { z } from "zod";

// Form schema
export const profileFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().optional(),
    location: z.string().optional(),
    gender: z.string().optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

// Form validation schema based on the Sanity schema
export const createFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters")
        .max(160, "Description must not exceed 160 characters"),
    category: z
        .string()
        .min(2, "Category must be at least 2 characters")
        .max(20, "Category must not exceed 20 characters"),
    mainImage: z.string().nonempty("Enter a Image Url").url("Enter a valid Url").refine(async (url) => {
        try {
            const res = await fetch(url, { method: "HEAD" });
            const contentType = res.headers.get("CONTENT-TYPE");

            return contentType?.startsWith("image/");
        } catch {
            return false;
        }
    }, "The provided url must be an Image url"),
    content: z.string().min(120, "Content must be at least 120 characters"),
})

export type CreateFormValues = z.infer<typeof createFormSchema>