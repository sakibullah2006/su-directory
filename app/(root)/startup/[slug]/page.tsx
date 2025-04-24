import { auth } from "@/auth"
// import { CommentSection } from "@/components/comment-section"
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
import Link from "next/link"



const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const userId = (await auth())?.id
  const { slug } = await params
  // const post = await getBlogPost(slug)

  const post: PostWithAuthorAndLikes = await getPostBySlug(slug)

  return (
    <article className="container max-w-3xl py-6 lg:py-12 mx-auto px-4">
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
        <Link href={`/users/${post.author?._id}`}>
          <Avatar>
            <AvatarImage src={post.author?.imageUrl || "/placeholder.svg"} alt={post.author?.name} />
            <AvatarFallback><Skeleton className="h-8 w-8 rounded-full" /></AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/users/${post.author?._id}`}>
            <div className="font-medium">{post.author?.name}</div>
          </Link>

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
      {/* <CommentSection postSlug={slug} /> */}
    </article >
  )
}


export default BlogPost