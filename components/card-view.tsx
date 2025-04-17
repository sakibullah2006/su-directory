import { PostWithAuthor } from '@/types/sanity'
import React, { Suspense } from 'react'
import { StartupCardSkeleton } from './post-card-skeleton'
import StartupCard from './startupCard'

const CardsGrid = ({ posts }: { posts: PostWithAuthor[] }) => {
  return (
    <Suspense fallback={<SkeletonCardGrid />}>
      <div className='card_grid'>
        {posts.map((post) => (
          <StartupCard post={post} key={post._id} />
        ))}
      </div>
    </Suspense>
  )
}


const SkeletonCardGrid = () => {
  return (
    <div className='card_grid'>
      {[0, 1, 2].map(index => <StartupCardSkeleton key={index} />)}
    </div>
  )
}

export default CardsGrid
