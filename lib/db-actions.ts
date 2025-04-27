"use server"
import { auth } from "@/auth"
import { writeClient } from "@/sanity/lib/write-client"
import { parseServerActionResponse, slugifyTitle } from "./utils"
import { CreateFormValues } from "./validation"


export interface UserObj {
    name?: string
    username?: string
    imageUrl?: string
    bio?: string
    gender?: string
    phone?: string,
    location?: string
}

export const updateProfile = async ({ userObj, userId }: { userObj: UserObj, userId: string }) => {
    try {
        await writeClient.patch(userId)
            .setIfMissing({ bio: "", phone: "", gender: "", location: "" })
            .set(userObj)
            .commit()
    } catch (error) {
        throw error
    }

}

export const createPost = async ({ fromData }: { fromData: CreateFormValues }) => {
    const session = await auth()

    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });

    try {
        const slug = slugifyTitle(fromData.title)

        // Create the post document in Sanity
        const postData = {
            _type: "post",
            title: fromData.title,
            slug: { current: slug },
            description: fromData.description,
            category: fromData.category,
            mainImage: fromData.mainImage,
            content: fromData.content,
            // The author will be set to the current user, this is a placeholder
            author: {
                _type: "reference",
                _ref: session?.id, // This should be replaced with the actual user ID
            },
        }

        const result = await writeClient.create(postData)

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS"
        })
    } catch (error) {
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR"
        })

    }
}