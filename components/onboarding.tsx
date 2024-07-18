/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Mp96xtQLfu7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'

export default function Onboarding() {
  return (
    <div className='flex flex-col min-h-[100dvh] bg-background text-foreground'>
      <main className='flex-1 flex flex-col justify-center items-center px-6 py-12 space-y-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-3xl font-bold'>Welcome to our App</h1>
          <p className='text-muted-foreground'>
            Discover a seamless way to manage your tasks and stay organized.
          </p>
        </div>
        <Image
          src='/placeholder.svg'
          width={200}
          height={200}
          alt='Onboarding'
          className='mx-auto '
        />
        <Button>
          <SignInButton />
        </Button>
      </main>
    </div>
  )
}
