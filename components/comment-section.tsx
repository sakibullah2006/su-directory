// "use client"

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { formatDate } from "@/lib/utils"
// import { useState } from "react"

// interface Comment {
//   id: string
//   author: {
//     name: string
//     image: string
//   }
//   content: string
//   createdAt: string
// }

// // Mock data for demonstration
// const mockComments: Comment[] = [
//   {
//     id: "1",
//     author: {
//       name: "Sarah Johnson",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     content:
//       "This tutorial was incredibly helpful! I was struggling with setting up Next.js but now I understand the process much better.",
//     createdAt: "2023-10-16T14:23:00.000Z",
//   },
//   {
//     id: "2",
//     author: {
//       name: "Michael Chen",
//       image: "/placeholder.svg?height=40&width=40",
//     },
//     content:
//       "Great explanation of the prerequisites. I would add that having some experience with React hooks would be beneficial before diving into Next.js.",
//     createdAt: "2023-10-17T09:45:00.000Z",
//   },
// ]

// export function CommentSection({ postSlug }: { postSlug: string }) {
//   const [comments, setComments] = useState<Comment[]>(mockComments)
//   const [newComment, setNewComment] = useState("")
//   // const slug = postSlug;

//   const handleAddComment = () => {
//     if (!newComment.trim()) return

//     const comment: Comment = {
//       id: Date.now().toString(),
//       author: {
//         name: "Current User",
//         image: "/placeholder.svg?height=40&width=40",
//       },
//       content: newComment,
//       createdAt: new Date().toISOString(),
//     }

//     setComments([comment, ...comments])
//     setNewComment("")
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Top Comments</h2>

//       {/* Add Comment */}
//       <div className="space-y-4">
//         <Textarea
//           placeholder="Add a comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="min-h-[100px]"
//         />
//         <Button onClick={handleAddComment}>Post Comment</Button>
//       </div>

//       {/* Comments List */}
//       <div className="space-y-6 mt-8">
//         {comments.map((comment) => (
//           <div key={comment.id} className="space-y-2">
//             <div className="flex items-center gap-3">
//               <Avatar>
//                 <AvatarImage src={comment.author.image || "/placeholder.svg"} alt={comment.author.name} />
//                 <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <div className="font-medium">{comment.author.name}</div>
//                 <div className="text-sm text-muted-foreground">{formatDate(comment.createdAt)}</div>
//               </div>
//             </div>
//             <p className="text-sm pl-12">{comment.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

