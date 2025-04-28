"use client";

import { signOut } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

const NavAvatar = ({ image, id }: { image: string, id: string }) => {

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-[50px] cursor-pointer">
          <AvatarImage src={image} />
          <AvatarFallback><Skeleton className='w-8 h-8 rounded-full' /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        <DropdownMenuItem  >
          <Link href={`/users/${id}`}>
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>

          <button onClick={handleSignOut} type="submit" className='cursor-pointer'>
            <span className="">Log Out</span>
            {/* <LogOut className="size-6 text-red-600 sm:hidden" /> */}
          </button>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavAvatar
