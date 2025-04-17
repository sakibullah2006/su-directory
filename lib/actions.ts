"use server"

import { auth } from "@/auth"
import { client } from "@/sanity/lib/client"
import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_QUERIES, POST_LIKES_QUERY, POST_QUERY_BY_SLUG } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"
import { PostLikesResult, PostWithAuthorAndLikes } from "@/types/sanity"


export const getAllPost = async (params?: object) => {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERIES, params: params })

  return posts
}

export const getPostBySlug = async (slug: string): Promise<PostWithAuthorAndLikes> => {
  const userId = (await auth())?.id;

  const post = await client.fetch(POST_QUERY_BY_SLUG, { slug, userId })

  return post;
}

// // export const unlikePost = async ({ postId }: { postId: string }) => {
// //     const userId = (await auth())?.id;

// //     // Unlike the post
// //     await writeClient
// //         .patch(postId)
// //         .setIfMissing({ likes: 0 }) // Safety measure
// //         .unset([`likedBy[_ref=="${userId}"]`])
// //         .dec({ likes: 1 })
// //         .commit();
// // }

// // export const likePost = async ({ postId }: { postId: string }) => {
// //     const userId = (await auth())?.id;

// //     // Like the post
// //     await writeClient
// //         .patch(postId)
// //         .setIfMissing({ likes: 0, likedBy: [] }) // Initialize if missing
// //         .insert('after', 'likedBy[-1]', [{ _ref: userId, _type: 'reference' }])
// //         .inc({ likes: 1 })
// //         .commit();

// // }



// export async function toggleLike({ postId }: { postId: string }) {
//     const userId = (await auth())?.id

//     // First check current like status
//     const post = await client
//         .withConfig({ useCdn: false })
//         .fetch(
//             POST_LIKES_QUERY,
//             { postId, userId }
//         );

//     if (!post) throw new Error('Post not found');

//     if (post.userLiked) {
//         // Unlike the post
//         return writeClient
//             .patch(postId)
//             .setIfMissing({ likes: 0 })
//             .unset([`likedBy[_ref=="${userId}"]`])
//             .dec({ likes: 1 })
//             .commit();
//     } else {
//         // Like the post
//         return writeClient
//             .patch(postId)
//             .setIfMissing({ likes: 0, likedBy: [] })
//             .insert('after', 'likedBy[-1]', [{ _ref: userId, _type: 'reference' }])
//             .inc({ likes: 1 })
//             .commit();
//     }
// }
interface ToggleLikeResult {
  success: boolean;
  newLikeStatus: boolean;
  likeCount: number;
}

export async function toggleLike(postId: string): Promise<ToggleLikeResult> {
  const userId = (await auth())?.id

  try {
    // 1. Check current like status
    const post: PostLikesResult = await client
      .withConfig({ useCdn: false })
      .fetch(
        POST_LIKES_QUERY,
        { postId, userId }
      );

    if (!post) throw new Error('Post not found');

    // 2. Execute the appropriate mutation
    if (post.userLiked) {
      // Unlike the post
      await writeClient
        .patch(postId)
        .setIfMissing({ likes: 0 })
        .unset([`likedBy[_ref=="${userId}"]`])
        .dec({ likes: 1 })
        .commit();

      return {
        success: true,
        newLikeStatus: false,
        likeCount: post.likes -1
      };
    } else {
      // Like the post
      // Like - add _key when inserting
      await writeClient
        .patch(postId)
        .setIfMissing({ likes: 0, likedBy: [] })
        .insert('after', 'likedBy[-1]', [{
          _key: crypto.randomUUID(), // Generate unique key
          _ref: userId,
          _type: 'reference'
        }])
        .inc({ likes: 1 })
        .commit();

      return {
        success: true,
        newLikeStatus: true,
        likeCount: post.likes + 1
      };
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error; // Re-throw for error handling in components
  }
}