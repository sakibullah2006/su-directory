import CardsGrid from '@/components/card-view'
import { getAllPost } from '@/lib/actions'

const Home = async () => {

  const posts = await getAllPost()


  return (
    <>
      <section className='pink_container pattern'>
        <h1 className='heading'>
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl text-2xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

      </section>

      <section className='section_container space-y-4'>

        <p className='text-3xl'>All Startups</p>

        <CardsGrid posts={posts} />
      </section>

    </>
  )
}

export default Home
