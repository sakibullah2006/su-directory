import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { MarkdownContent } from "@/components/markdown-content"
import { CommentSection } from "@/components/comment-section"

// This would typically come from your CMS or API
async function getBlogPost(slug: string) {
  // Mock data for demonstration
  return {
    title: "A Beginner's Guide to Building Your First Next.js Application: Step-by-Step Tutorial",
    publishedAt: "2023-10-15T09:00:00.000Z",
    author: {
      name: "Jose Calvario",
      image: "/placeholder.svg?height=40&width=40",
    },
    series: "BEGINNER SERIES",
    version: "VERSION 13",
    seriesNumber: 1,
    seriesTitle: "Getting Started",
    likes: 21,
    tags: ["nextjs", "javascript", "react", "beginners"],
    content: `
# Getting Set Up in Next.js

In this series, we're going through the basics of learning the static site generator, Next.js.

We'll go through installing Next.js 13, create a few pages, and a blog, and finally take a look at the data files. Everything we do will be built from scratch, so no previous Next.js knowledge is necessary only the basics of HTML, CSS, JavaScript, and React. By the end of this series, we'll have the skills and knowledge to build our own Next.js projects from scratch.

## Prerequisites

If you intend to follow along with this tutorial on your system, please ensure you have the following:

* A basic understanding of working with the terminal.
* A Laptop or PC with Windows installed
* An Internet connection
* Git is installed on your local machine (optional). For more details on accomplishing this, review Installing Git and Setting up Git on Windows.
* A GitHub account. For more details on accomplishing this, review How to get started with Git and GitHub
* The latest version of Visual Studio Code is installed on your machine.
* Basic knowledge of HTML, CSS, JavaScript, and React.

Let's get started!

## Why use Next.js?

Next.js is a popular open-source framework for building React-based web applications. It offers a range of benefits that can make developments faster, more efficient, and more enjoyable.
    `,
  }
}

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const post = await getBlogPost(params.slug)

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      {/* Header Image */}
      <div className="relative bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="text-sm font-medium mb-1">{post.series}</div>
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
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
      </div>

      {/* Author and Date */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{post.author.name}</div>
          <div className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</div>
        </div>
      </div>

      {/* Likes */}
      <div className="flex items-center gap-1 mb-4">
        <Button variant="ghost" size="sm" className="text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          {post.likes}
        </Button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight mb-4">{post.title}</h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Markdown Content */}
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <MarkdownContent content={post.content} />
      </div>

      <Separator className="my-8" />

      {/* Comments Section */}
      <CommentSection postSlug={params.slug} />
    </article>
  )
}


export default BlogPost
