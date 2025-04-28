import { groq } from "next-sanity"

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

export const AUTHOR_BY_ID_QUERY = groq`
*[_type == "user" && _id == $_id][0]{
  _id, 
  id,
  name,
  username,
  email,
  bio,
  gender,
  location,
  imageUrl,
  phone,
  _createdAt
}
`

// export const POSTS_QUERIES = groq`
// *[_type == "post"] | order(_createdAt desc){
//   _id,
//   title,
//   slug,
//   description, 
//   category, 
//   view,
//   likes,
//   mainImage,
//   author -> {
//     _id,
//     name,
//     username, 
//     imageUrl,
//     bio
//   },
//   likes,
//   _createdAt, 
//   _updatedAt 
// }
// `

export const POSTS_QUERIES = groq`*[_type == "post" && defined(slug.current) && (
  !defined($search) || 
  title match "*" + $search + "*" || 
  category match "*" + $search + "*" || 
  author->name match "*" + $search + "*"
)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description, 
  category, 
  view,
  likes,
  mainImage,
  author -> {
    _id,
    name,
    username, 
    imageUrl,
    bio
  },
  _createdAt, 
  _updatedAt 
}`

export const POSTS_QUERIES_BY_AUTHOR_ID = groq`
*[_type == "post" && author->_id==$_id] | order(_createdAt desc){
  _id,
  title,
  slug,
  description, 
  category, 
  view,
  likes,
  mainImage,
  author -> {
    _id,
    name,
    username, 
    imageUrl,
    bio
  },
  likes,
  _createdAt, 
  _updatedAt 
}
`

export const POST_QUERY_BY_SLUG = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  slug,
  title,
  likes,
  description, 
  category, 
  view,
  mainImage,
  author -> {
    _id,
    name,
    username, 
    imageUrl
  },
  content,
  likes,
  likedBy[]->{_id, name, imageUrl},
  "hasLiked": $userId in likedBy[]._ref,
  _createdAt, 
  _updatedAt 
}
`
export const POST_LIKES_QUERY = groq`*[_type == "post" && _id == $postId][0]{
  "userLiked": $userId in likedBy[]._ref,
  likedBy[]->{_id, name, imageUrl},
  likes
}`