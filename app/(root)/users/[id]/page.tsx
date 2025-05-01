// app/profile/page.tsx (for App Router)

import { auth } from "@/auth"
import AboutCard, { AboutCardSkeleton } from "@/components/about-card"
import { PatternBackground } from "@/components/pattern-background"
import ProfileCard from "@/components/profile-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProjectCard from "@/components/user-project-card"
import { getAuthorById, getUserPosts } from "@/lib/actions"
import { Activity, FileText, Users } from "lucide-react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ProfielCardSkeleton } from "./loading"

export async function generateMetadata({ params }): Promise<Metadata> {
  const _id = (await params).id;

  const user = await getAuthorById(_id); // Fetch user data

  if (!user) return {
    title: "Page Not Found"
  };


  return {
    title: `${user.name}'s Profile | SU Directory`,
    description: `View ${user.name}'s profile.`,

    openGraph: {
      images: [user.imageUrl],
    },
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;
  const currentUser = (await auth())?.id

  const [posts, user] = await Promise.all([
    getUserPosts({ _id }),
    getAuthorById(_id)
  ])

  if (user === null) return notFound();



  // const { name, username, imageUrl, _createdAt, bio, gender, email, phone } = await getAuthorById(_id)
  // const post = await getAllPost()

  return (
    <div className="min-h-screen bg-radial-[at_25%_25%] from-slate-50 to-slate-600 to-75%">
      <PatternBackground
        colorPrimary="#000000"
        colorSecondary="#3b82f6"
        patternType="waves"
        size={25}
        opacity={0.4}
        className="h-64 w-full"
      />

      <main className="container mx-auto px-4 -mt-30 pb-5">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 ">
          {/* Profile Card - column 1 */}
          {/* <ProfileCard user={user} /> */}
          <Suspense fallback={<ProfielCardSkeleton />}>
            <ProfileCard user={user} currentUser={currentUser!} isEditable={currentUser === user._id} />
          </Suspense>

          {/* Column 2 */}
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            {/* About section */}
            <Suspense fallback={<AboutCardSkeleton />}>
              <AboutCard initialBio={user.bio} userId={_id} isEditable={currentUser === user._id} />
            </Suspense>

            {/* Tabs section */}
            <Tabs defaultValue="posts">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="posts" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Posts
                  </TabsTrigger>
                  <TabsTrigger value="featured" className="flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    Featured
                  </TabsTrigger>
                  <TabsTrigger value="connections" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Connections
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Projects tab */}
              <TabsContent value="posts" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {posts.map((post) => (
                    <UserProjectCard key={post._id} post={post} />
                  ))}
                </div>
              </TabsContent>

              {/* Activity tab */}
              <TabsContent value="featured" className="space-y-4">
                {/* Activity content */}
                {/* ... (rest of the activity tab content) */}
              </TabsContent>

              {/* Connections tab */}
              <TabsContent value="connections" className="space-y-4">
                {/* Connections content */}
                {/* ... (rest of the connections tab content) */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page