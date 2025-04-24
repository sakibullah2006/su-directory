import { formatDate } from '@/lib/utils'
import { User } from '@/sanity.types'
import { Calendar, Edit, Mail, MapPin, Mars, Phone, Settings } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Separator } from './ui/separator'

const ProfileCard = ({ user }: { user: User }) => {

    const { name, username, imageUrl, _createdAt, gender, email, phone } = user

    return (
        <Card className="md:col-span-1 shadow-lg">
            <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                <div className="relative">
                    <div className="h-25 w-25 bg-cyan-500 rounded-full">
                        <Avatar className="h-24 w-24 border-4 border-cyan-500 ">
                            <AvatarImage src={imageUrl} alt="Profile picture" />
                            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <Button
                        size="icon"
                        variant="outline"
                        className="absolute bottom-0 right-0 rounded-full bg-white h-8 w-8"
                    >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit profile picture</span>
                    </Button>
                </div>
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
                        <span>{email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{phone || "Unknown"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Unknown</span>
                    </div>
                    {
                        gender ? (
                            <div className="flex items-center space-x-2 text-sm">
                                <Mars className="h-4 w-4 text-muted-foreground" />
                                <span>{gender}</span>
                            </div>) : ""
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
                <Separator />
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
                <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProfileCard