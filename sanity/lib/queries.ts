import { groq } from "next-sanity";

export const AUTHOR_BY_GITHUB_ID_QUERY = groq`
*[_type == "user" && id == $id][0]{
  _id, 
  id,
  name,
  username,
  email,
  bio,
  imageUrl,
  phone
}
`

export const POSTS_QUERIES = groq`
*[_type == "post"] | order(_createdAt desc){
  _id,
  title,
  slug,
  description, 
  category, 
  view,
  mainImage,
  author -> {
    _id,
    name,
    username, 
    imageUrl,
    bio
  },
  content,
  _createdAt, 
  _updatedAt 
}
`
