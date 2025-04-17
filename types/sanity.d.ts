// types/sanity.d.ts
import type { Post, User } from '@/sanity.types';

export type PostWithAuthor = Omit<Post, 'author'> & {
  author: Pick<User,'_id' | 'name' | 'username' | 'imageUrl' | 'bio'> | null;
  _createdAt: string;
  _updatedAt: string;
};

declare module '@sanity/client' {
  interface SanityQueries {
    [POSTS_QUERIES]: PostWithAuthor[];
  }
}
