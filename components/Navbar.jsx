import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogIn, PlusCircleIcon } from "lucide-react";
import Link from 'next/link';
import NavAvatar from "./NavbarAvatar";
import { ModeToggle } from "./mode-toggle";

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
              {/* <form */}
              {/*   action={async () => { */}
              {/*     "use server"; */}
              {/*     await signOut({ redirectTo: "/" }) */}
              {/*   }}> */}
              {/*   <button type="submit"> */}
              {/*     <span className="max-sm:hidden">Log Out</span> */}
              {/*     <LogOut className="size-6 text-red-600 sm:hidden" /> */}
              {/*   </button> */}
              {/* </form> */}
            
              <NavAvatar image={session.user.image} id={session.id} />

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
          <ModeToggle />

        </div>
      </nav>
    </header>
  )
}

export default Navbar
