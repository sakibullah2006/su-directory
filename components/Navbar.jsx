import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogIn, PlusCircleIcon } from "lucide-react";
import Link from 'next/link';
import NavAvatar from "./NavbarAvatar";
import { ModeToggle } from "./mode-toggle";
import { Skeleton } from "./ui/skeleton";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className='px-3 py-4 shadow-sm dark:shadow-gray-900 mx-auto'>
      <nav className='flex items-center justify-between'>
        <Link href="/">
          <div className='text-xl font-mono'>SU Directory</div>
        </Link>


        <div className='flex justify-evenly items-center gap-4'>
          {session && session.user ? (
            <>
              <Link href={`/startup/create`}>
                <Button variant="outline">
                  <span className="max-sm:hidden">Create</span>
                  <PlusCircleIcon className="size-6 sm:hidden" />
                </Button>
              </Link>
              <NavAvatar image={session.user.image} id={session.id} asChild/>

            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github")
              }}>
              <Button type="submit" variant="outline">
                <span className="max-sm:hidden cursor-pointer">Log In</span>
                <LogIn className="size-4 text-green-600 sm:hidden" />
              </Button>
            </form>
          )}
          <ModeToggle asChild/>

        </div>
      </nav>
    </header>
  )
}

export const NavBarSkeleton = () => {
  return (
    <header className="px-3 py-4 shadow-sm dark:shadow-gray-900 mx-auto">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <div className="text-xl font-mono">SU Directory</div>
        </Link>

        <div className="flex justify-evenly items-center gap-4">
          {/* We don't know if user is logged in during loading, so we'll show a skeleton for the buttons */}
          <div className="flex items-center gap-4">
            {/* Create button skeleton */}
            <div className="relative">
              <Button variant="outline" className="invisible">
                <span className="max-sm:hidden">Create</span>
                <PlusCircleIcon className="size-6 sm:hidden" />
              </Button>
              <Skeleton className="absolute inset-0 rounded-md" />
            </div>

            {/* Avatar skeleton */}
            <Skeleton className="h-8 w-8 rounded-full" />

            {/* Login button skeleton (hidden if avatar is shown) */}
            <div className="relative hidden">
              <Button variant="outline" className="invisible">
                <span className="max-sm:hidden">Log In</span>
                <LogIn className="size-4 text-green-600 sm:hidden" />
              </Button>
              <Skeleton className="absolute inset-0 rounded-md" />
            </div>
          </div>

          {/* Mode toggle - we keep this as is since it doesn't depend on authentication */}
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
