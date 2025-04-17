import { auth } from "@/auth"
import { CommentSection } from "@/components/comment-section"
import { LikeButton } from "@/components/like-button"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { getPostBySlug } from "@/lib/actions"
import { formatDate } from "@/lib/utils"
import { PostWithAuthorAndLikes } from "@/types/sanity"
import Image from "next/image"




// This would typically come from your CMS or API
// async function getBlogPost(slug: string) {

//   // Mock data for demonstration
//   return {
//     title: "A Beginner's Guide to Building Your First Next.js Application: Step-by-Step Tutorial",
//     publishedAt: "2023-10-15T09:00:00.000Z",
//     author: {
//       name: "Jose Calvario",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     slug,
//     series: "BEGINNER SERIES",
//     version: "VERSION 13",
//     seriesNumber: 1,
//     seriesTitle: "Getting Started",
//     likes: 21,
//     tags: ["nextjs", "javascript", "react", "beginners"],
//     content: `
// # Getting Set Up in Next.js

// In this series, we're going through the basics of learning the static site generator, [Next.js](https://nextjs.org/).

// We'll go through installing Next.js 13, create a few pages, and a blog, and finally take a look at the data files. Everything we do will be built from scratch, so no previous Next.js knowledge is necessary only the basics of HTML, CSS, JavaScript, and React. By the end of this series, we'll have the skills and knowledge to build our own Next.js projects from scratch.

// ## Prerequisites

// you need to know how to write Hello World in JavaScript
// ${"``` console.log('Hello World!') ```"}

// If you intend to follow along with this tutorial on your system, please ensure you have the following:

// * A basic understanding of working with the terminal.
// * A Laptop or PC with Windows installed
// * An Internet connection
// * **Git** is installed on your local machine (optional). For more details on accomplishing this, review Installing Git and Setting up Git on Windows.
// * A **GitHub** account. For more details on accomplishing this, review How to get started with Git and GitHub
// * The latest version of **Visual Studio Code** is installed on your machine.
// * Basic knowledge of **HTML**, **CSS**, **JavaScript**, and **React**.

// Let's get started!

// ## Why use Next.js?

// Next.js is a popular open-source framework for building React-based web applications. It offers a range of benefits that can make developments faster, more efficient, and more enjoyable.
//     `,
//   }
// }

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const userId = (await auth())?.id
  const { slug } = await params
  // const post = await getBlogPost(slug)

  const post: PostWithAuthorAndLikes = await getPostBySlug(slug)

  return (
    <article className="container max-w-3xl py-6 lg:py-12 mx-auto">
      {/* Header Image */}
      {/* <div className="relative bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="text-sm font-medium mb-1">{post.series}</div>
          <div className="flex items-center gap-2">
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-4xl font-bold">NEXT.js</h1>
          </div>
          <div className="text-xs text-muted-foreground mt-1">{post.version}</div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-medium">
            {post.seriesNumber}
          </div>
          <div className="font-medium">{post.seriesTitle}</div>
        </div>
      </div> */}
      <div className="relative bg-white rounded-lg shadow-sm mb-6 overflow-hidden h-64">
        {/* Cover Image */}
        <Image src={post.mainImage!} alt="Cover Image" fill className="object-cover" priority />

        {/* Overlay with gradient for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" /> */}
      </div>

      {/* Author and Date */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarImage src={post.author?.imageUrl || "/placeholder.svg"} alt={post.author?.name} />
          <AvatarFallback><Skeleton className="h-8 w-8 rounded-full" /></AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{post.author?.name}</div>
          <div className="text-sm text-muted-foreground">{formatDate(post._createdAt)}</div>
        </div>
      </div>

      {/* Likes */}
      <LikeButton postId={post._id} initialLikes={post.likes} userId={userId} initialHasLiked={post.hasLiked} />

      {/* Tit/e */}
      <h1 className="text-3xl font-bold tracking-tight mb-4">{post.title}</h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge key={post.category} variant="outline" className="text-xs">
          #{post.category}
        </Badge>
      </div>

      <Separator className="my-6" />

      {/* Markdown Content */}
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <MarkdownRenderer content={post.content!} />
      </div>

      <Separator className="my-8" />

      {/* Comments Section */}
      <CommentSection postSlug={slug} />
    </article >
  )
}


export default BlogPost