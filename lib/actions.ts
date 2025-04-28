"use server"

import { auth } from "@/auth"
import { User } from "@/sanity.types"
import { client } from "@/sanity/lib/client"
// import { sanityFetch } from "@/sanity/lib/live"
import { AUTHOR_BY_ID_QUERY, POSTS_QUERIES, POSTS_QUERIES_BY_AUTHOR_ID, POST_LIKES_QUERY, POST_QUERY_BY_SLUG } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"
import { PostLikesResult, PostWithAuthor, PostWithAuthorAndLikes } from "@/types/sanity"

export interface Query_ParamsProps {
  search?: string
}  

export const getAllPost = async (params: Query_ParamsProps): Promise<PostWithAuthor[]> =>  {
  if(params.search){
    const posts  = await client.fetch(POSTS_QUERIES, { params}, {useCdn: false})
    return posts
 
  } else{
    const  posts= await client.fetch(POSTS_QUERIES,  {search: null}, {useCdn: false} )

    return posts
  }

}


export const getPostBySlug = async (slug: string): Promise<PostWithAuthorAndLikes> => {
  const userId = (await auth());

  const post = await client.fetch(POST_QUERY_BY_SLUG, { slug, userId })

  return post;
}

export const getAuthorById = async (_id: string): Promise<User> => {
  try {
    const post = await client.fetch(AUTHOR_BY_ID_QUERY, {_id: _id})

    return post
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getUserPosts = async ({_id}:{ _id: string}): Promise<PostWithAuthor[]> => {
  try {
    const posts = await client.fetch(POSTS_QUERIES_BY_AUTHOR_ID, {_id: _id})

    return posts
  } catch (error) {
    console.log(error)
    throw error
  }
}

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
        likeCount: post.likes - 1
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