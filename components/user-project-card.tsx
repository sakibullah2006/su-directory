/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/utils";
import { PostWithAuthor } from "@/types/sanity";
import Link from "next/link";
import React from 'react';
import { badgeVariants } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

const UserProjectCard = ({ post }: { post: PostWithAuthor }) => {
    const { title, description, mainImage: image, category, _createdAt, slug } = post

    return (
        < Card className="shadow-lg justify-evenly" >
            <CardHeader>
                <div className="relative max-h-30 w-full flex justify-center">
                    <img src={image!} alt={title!} className="object-cover w-full max-h-[164px] rounded-md" />
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(_createdAt)}</span>
                <CardTitle className="">{post.title}</CardTitle>

            </CardHeader>
            <CardContent>
                <CardDescription className="line-clamp-3">{description}</CardDescription>
                <div className="mt-1">
                    <Link className={badgeVariants() + `dark:invert`} href={`/?query=${category}`}>{category}</Link>
                </div>
            </CardContent>

            <CardFooter className="">
                <Link href={`/startup/${slug?.current}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        View Post
                    </Button>
                </Link>
            </CardFooter>
        </Card >
    )
}

export default UserProjectCard
