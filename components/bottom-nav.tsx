'use client'

import { cn } from '@/lib/utils'
import {
  HeartIcon,
  HomeIcon,
  MapIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className='fixed bottom-0 left-0 z-50 flex w-full bg-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.06)]'>
      <div className='flex flex-1 items-center justify-around py-3'>
        <Link
          href='/'
          className={cn(
            `flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary`,
            path === '/' && 'text-primary'
          )}
          prefetch={false}
        >
          <HomeIcon className='h-6 w-6' />
          <span className='text-xs'>Home</span>
        </Link>
        <Link
          href='/search'
          className={cn(
            `flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary`,
            path === '/search' && 'text-primary'
          )}
          prefetch={false}
        >
          <SearchIcon className='h-6 w-6' />
          <span className='text-xs'>Search</span>
        </Link>
        <Link
          href='/map'
          className={cn(
            `flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary`,
            path === '/map' && 'text-primary'
          )}
          prefetch={false}
        >
          <MapIcon className='h-6 w-6' />
          <span className='text-xs'>Map</span>
        </Link>
        <Link
          href='/favorites'
          className={cn(
            `flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary`,
            path === '/favorites' && 'text-primary'
          )}
          prefetch={false}
        >
          <HeartIcon className='h-6 w-6' />
          <span className='text-xs'>Favorites</span>
        </Link>
        <Link
          href='/profile'
          className={cn(
            `flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary`,
            path === '/profile' && 'text-primary'
          )}
          prefetch={false}
        >
          <UserIcon className='h-6 w-6' />
          <span className='text-xs'>Profile</span>
        </Link>
      </div>
    </nav>
  )
}
