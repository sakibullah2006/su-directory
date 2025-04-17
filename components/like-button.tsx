// components/LikeButton.tsx
'use client';

import { toggleLike } from '@/lib/actions';
import { useState } from 'react';
import { Button } from './ui/button';

interface LikeButtonProps {
    postId: string;
    userId?: string; // Make optional for guest users
    initialLikes: number;
    initialHasLiked: boolean;
}

export function LikeButton({
    postId,
    userId,
    initialLikes,
    initialHasLiked
}: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(initialHasLiked);
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async () => {
        if (!userId) {
            // Redirect to login or show tooltip
            return;
        }

        setIsLoading(true);
        try {
            // Optimistic update
            const newLikeStatus = !hasLiked;
            setHasLiked(newLikeStatus);
            setLikes(newLikeStatus ? likes + 1 : likes - 1);

            // Actual mutation
            const result = await toggleLike(postId);

            // Sync with actual result in case optimistic update was incorrect
            setHasLiked(result.newLikeStatus);
            setLikes(result.likeCount);
        } catch (error) {
            // Revert on error
            setHasLiked(initialHasLiked);
            setLikes(initialLikes);
            console.error('Like operation failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant='ghost'
            onClick={handleLike}
            disabled={isLoading || !userId}
            aria-label={hasLiked ? 'Unlike this post' : 'Like this post'}
            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${hasLiked
                ? 'text-red-500 hover:bg-red-50'
                : 'text-gray-500 hover:bg-gray-100'
                } ${isLoading ? 'opacity-50' : ''}`}
        >
            <HeartIcon filled={hasLiked} />
            <span className="text-sm font-medium">{likes}</span>
        </Button>
    );
}

// Heart icon component
function HeartIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}