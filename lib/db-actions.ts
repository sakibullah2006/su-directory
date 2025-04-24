"use server"
import { writeClient } from "@/sanity/lib/write-client"

export interface UserObj  {
    name?: string
    username?: string
    imageUrl?: string
    bio?: string
    gender?: string
    phone?: string,
    location?: string
}

export  const updateProfile = async ({userObj, userId }: {userObj: UserObj, userId: string}) => {
    try {
      await writeClient.patch(userId)
        .setIfMissing({bio: "", phone:"", gender: "", location: ""})
        .set(userObj)
        .commit()
    } catch (error) {
        throw error
    }

}