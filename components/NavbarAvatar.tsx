import { signOut } from '@/auth'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

const NavAvatar = ({ image, id }: { image: string, id: string }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-[50px] cursor-pointer">
          <AvatarImage src={image} />
          <AvatarFallback><Skeleton className='w-8 h-8 rounded-full' /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`users/${id}`}>
          <DropdownMenuItem >
            <div>
              Profile
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" })
            }}>
            <button type="submit" className='cursor-pointer'>
              <span className="">Log Out</span>
              {/* <LogOut className="size-6 text-red-600 sm:hidden" /> */}
            </button>
          </form>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavAvatar
