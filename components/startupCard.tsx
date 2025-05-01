"use client"

/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/lib/utils'
import type { PostWithAuthor } from '@/types/sanity'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { badgeVariants } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

interface StartupCardProps {
  post: PostWithAuthor
}

const StartupCard = ({ post
}: StartupCardProps) => {
  const { title, slug, description, _createdAt, mainImage, category, author } = post;

  return (
    <Card className="overflow-hidden max-w-sm w-full justify-evenly mx-auto">
      <CardHeader className=" p-4 pb-0">
        <Link href={`/startup/${slug.current}`}>
          <h1 className="text-lg font-bold leading-tight line-clamp-2">{title}</h1>
        </Link>

        <div className="flex items-center justify-between gap-3 mb-1">
          <Link href={`/users/${author?._id}`}>
            <div className="flex gap-3 items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage className='' src={author?.imageUrl || "/placeholder.svg"} alt={author?.name} />
                <AvatarFallback><Skeleton className='w-8 h-8 rounded-full' /></AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{author?.name}</span>
            </div>
          </Link>
          <span className="text-xs text-muted-foreground">{formatDate(_createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent className="mb-0 p-4 pt-0 pb-0 flex flex-col gap-4 justify-evenly">
        <p className="text-sm text-muted-foreground line-clamp-3 break-words">{description}</p>

        <div className="relative max-h-30 w-full flex justify-center">
          <img src={mainImage || "/placeholder.svg"} alt={title!} className="object-cover w-full max-h-[164px] rounded-md" />
        </div>
        <div>
          <Link className={badgeVariants({}) + `dark:invert`} href={`/?query=${category}`}>{category}</Link>
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

export default StartupCard
