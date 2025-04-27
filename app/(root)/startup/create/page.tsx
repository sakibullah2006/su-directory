import CreatePostForm from "@/components/create-post-form"
import type { Metadata } from "next"


export const metadata: Metadata = {
    title: "Create Post",
    description: "Create a new post for YC Directory",
}

const CreatePostPage = () => {
    return (
        <div className="container max-w-3xl py-10 mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
                <p className="text-muted-foreground">Share your thoughts with the community</p>
            </div>
            <div className="mt-8">
                <CreatePostForm />
            </div>
        </div>
    )
}

export default CreatePostPage