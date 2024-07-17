import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'

export default function HomeNav() {
  return (
    <header className='flex items-center justify-between bg-background px-4 py-3 shadow-sm sm:px-6'>
      <Link href='#' className='text-lg font-bold' prefetch={false}>
        Boardly
      </Link>
      <Button variant='outline' size='icon' className='rounded-full'>
        <MenuIcon className='h-6 w-6' />
        <span className='sr-only'>Toggle menu</span>
      </Button>
    </header>
  )
}
