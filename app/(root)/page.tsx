import CardsGrid from '@/components/card-view';
import SearchBar from '@/components/search-bar';
import { Query_ParamsProps, getAllPost } from '@/lib/actions';

const Home = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const query = (await searchParams).query;
  const params: Query_ParamsProps = { search: query };


  const posts = await getAllPost(params)


  return (
    <>
      {/* <section className='pink_container pattern bg-teal-600 '>
        <h1 className='heading'>
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl text-2xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

      </section> */}

      <section className="pink_container pattern-grid animate-pattern gradient-bg relative overflow-hidden flex flex-col items-center justify-evenly">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        </div>

        <h1 className="heading-enhanced">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl text-2xl font-medium">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        {/* Optional decorative element */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="mt-8 w-full max-w-2xl mx-auto flex justify-center">
          <SearchBar initialQuery={query} />
        </div>
      </section>

      <section className='section_container space-y-4'>

        <p className='text-3xl'>All Startups</p>

        <CardsGrid posts={posts} />
      </section>

    </>
  )
}

export default Home
