// types/sanity.d.ts
import { Post, User } from '@/sanity.types';
import { POSTS_QUERIES, POSTS_QUERIES_BY_AUTHOR_ID, POST_LIKES_QUERY, POST_QUERY_BY_SLUG } from '@/sanity/lib/queries';

export type PostWithAuthor = Omit<Post, 'author'> & {
  author: Pick<User,'_id' | 'name' | 'username' | 'imageUrl' | 'bio'> | null;
  _createdAt: string;
  _updatedAt: string;
};

export type PostWithAuthorAndLikes = Omit<Post, 'author' | 'likedBy'> & {
  author: Pick<User, '_id' | 'name' | 'username' | 'imageUrl' | 'bio'> | null;
  likes: number;
  likedBy: Array<Pick<User, '_id' | 'name' | 'imageUrl'>> | null;
  hasLiked: boolean;
  _createdAt: string;
  _updatedAt: string;
};

export type PostLikesResult = {
  userLiked: boolean;
  likes: number;
  likedBy: Array<Pick<User, '_id' | 'name' | 'imageUrl'>>;
};




declare module '@sanity/client' {
  interface SanityQueries {
    [POSTS_QUERIES]: PostWithAuthor[];
    [POSTS_QUERIES_BY_AUTHOR_ID]: PostWithAuthor[];
    [POST_QUERY_BY_SLUG]: PostWithAuthorAndLikes;
    [POST_LIKES_QUERY]: PostLikesResult;
  }
}
