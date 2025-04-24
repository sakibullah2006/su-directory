import { z } from "zod";

// Form schema
export const profileFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().optional(),
    location: z.string().optional(),
    gender: z.string().optional(),
})