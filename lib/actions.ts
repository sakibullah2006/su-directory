"use server"

import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_QUERIES } from "@/sanity/lib/queries"

export const getAllPost = async (params?: object) => {
    const { data: posts } = await sanityFetch({ query: POSTS_QUERIES, params: params })
    
    return posts
}