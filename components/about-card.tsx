"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { UserObj, updateProfile } from "@/lib/db-actions"
import { Edit } from "lucide-react"
import { useState } from "react"
import { toast } from 'sonner'
import { Skeleton } from "./ui/skeleton"

interface AboutCardProps {
    initialBio?: string
    userId: string
    isEditable: boolean
}

export default function AboutCard({ userId, initialBio, isEditable }: AboutCardProps) {
    const [bio, setBio] = useState(initialBio)
    const [editedBio, setEditedBio] = useState(initialBio)
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async () => {
        const property: UserObj = { bio: editedBio }

        try {
            setIsLoading(true)
            await updateProfile({ userObj: property, userId })
            setBio(editedBio)
            toast.success("Bio updated", {
                description: "Your bio has been successfully updated.",
            })
        } catch {
            toast.error("Error", {
                description: "Failed to update bio. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>About</CardTitle>
                {isEditable && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit bio</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Bio</DialogTitle>
                                <DialogDescription>
                                    Make changes to your bio here. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Textarea
                                    value={editedBio}
                                    onChange={(e) => setEditedBio(e.target.value)}
                                    placeholder="Write something about yourself..."
                                    className="min-h-[120px]"
                                />
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setEditedBio(bio)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} disabled={isLoading}>
                                    {isLoading ? "Saving..." : "Save"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </CardHeader>
            <CardContent className="-mt-6 text-center">
                <p className="text-muted-foreground whitespace-pre-line">
                    {bio || "Bio is empty"}
                </p>
            </CardContent>
        </Card>
    )
}

export const AboutCardSkeleton = () => {
    return (
        <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="mr-2 h-4 w-4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
        </Card>
    )
}
