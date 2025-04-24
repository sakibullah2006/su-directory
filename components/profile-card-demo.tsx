
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateProfile } from "@/lib/db-actions"
import { profileFormSchema } from "@/lib/validation"
import { User } from "@/sanity.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, HelpCircle, Mail, MapPin, MarsIcon, Phone, Settings, Venus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"



type ProfileFormValues = z.infer<typeof profileFormSchema>

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

interface ProfileCardProps {
    user: User
    currentUser: string
    isEditable: boolean
}

const ProfileCard = ({ user, currentUser, isEditable }: ProfileCardProps) => {
    const [open, setOpen] = useState(false)
    const [userData, setUserData] = useState({ email: user.email, phone: user.phone, gender: user.gender, location: user.location })
    const { name, username, imageUrl, _createdAt } = user

    // Initialize form with current values
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            email: userData.email || "",
            phone: userData.phone || "",
            location: userData.location || "",
            gender: userData.gender || "",
        },
    })

    const onSubmit = async (data: ProfileFormValues) => {
        // Handle form submission

        try {
            // update bio
            await updateProfile({ userObj: data, userId: currentUser })
            // update UI
            const inputData = {
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                location: data.location
            }
            setUserData(inputData)

            toast.success(
                "Profile Updated", {
                description: "Your Profile has been successfully updated.",
            },
            )
        } catch (error) {
            toast.error(
                "Error", {
                description: "Failed to update Profile. Please try again.",
            })
            console.error("Failed to save bio:", error)
        } finally {
            setOpen(false)
        }
        console.log("Form submitted:", data)
    }

    return (
        <Card className="md:col-span-1 shadow-lg">
            <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                {/* <div className="relative"> */}
                <div className="h-25 w-25 bg-cyan-500 rounded-full">
                    <Avatar className="h-24 w-24 border-4 border-cyan-500 ">
                        <AvatarImage src={imageUrl} alt="Profile picture" />
                        <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
                {/* <Button
                        size="icon"
                        variant="outline"
                        className="absolute bottom-0 right-0 rounded-full bg-white h-8 w-8"
                    >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit profile picture</span>
                    </Button> */}
                {/* </div> */}
                <div className="space-y-1 text-center">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-muted-foreground">{'@' + username}</p>
                </div>
                {/* <div className="flex items-center space-x-1">
    <Badge variant="secondary">Pro Member</Badge>
  </div> */}
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Contact info section */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.phone || "Unknown"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.location?.toUpperCase() || "Unknown"}</span>
                    </div>
                    {
                        userData.gender &&
                        <GenderIndicator gender={userData.gender} />
                    }
                    {/* <div className="flex items-center space-x-2 text-sm">
      <LinkIcon className="h-4 w-4 text-muted-foreground" />
      <a href="#" className="text-primary hover:underline">
        janedoe.design
      </a>
    </div> */}
                    <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {formatDate(_createdAt).split(" ")[0] + ", " + formatDate(_createdAt).split(" ")[2]}</span>
                    </div>
                </div>
                {/* Skills section */}
                {/* <div className="space-y-2">
                    <h3 className="text-sm font-medium">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">UI Design</Badge>
                        <Badge variant="outline">UX Research</Badge>
                        <Badge variant="outline">Prototyping</Badge>
                        <Badge variant="outline">Figma</Badge>
                        <Badge variant="outline">Design Systems</Badge>
                    </div>
               </div>
                <Separator /> */}
                {/* Teams section */}
                {/* <div className="space-y-2">
                    <h3 className="text-sm font-medium">Teams</h3>
                    <div className="flex flex-wrap gap-2">
                    <Badge>Product</Badge>
                    <Badge>Design</Badge>
                    </div>
                </div> */}
            </CardContent>
            <CardFooter>
                {
                    isEditable &&

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <Settings className="mr-2 h-4 w-4" /> Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>Make changes to your profile information here.</DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="email@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Phone number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your location" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                        <SelectItem value="none">Prefer not to say</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                }
            </CardFooter>
        </Card>
    )
}




export const GenderIndicator = ({ gender }: { gender: string }) => {
    if (!gender) return null

    const normalizedGender = gender.toLowerCase().trim()

    if (normalizedGender === "male") {
        return (
            <div className="flex items-center space-x-2 text-sm">
                <MarsIcon className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Male</span>
            </div>
        )
    } else if (normalizedGender === "female") {
        return (
            <div className="flex items-center space-x-2 text-sm">
                <Venus className="h-4 w-4 text-pink-500" />
                <span className="font-medium">Female</span>
            </div>
        )
    } else {
        return (
            <div className="flex items-center space-x-2 text-sm">
                <HelpCircle className="h-4 w-4 text-gray-500" />
                <span className="text-muted-foreground">Not Specified</span>
            </div>
        )
    }

}

export default ProfileCard
