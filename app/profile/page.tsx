import { UserButton } from '@clerk/nextjs'
import {
  BellIcon,
  ChevronRightIcon,
  LockIcon,
  SunIcon,
  UserIcon,
} from 'lucide-react'
import Link from 'next/link'
import React, { ElementType } from 'react'

export default function Profile() {
  return (
    <div className=''>
      <UserButton
        showName
        appearance={{
          elements: {
            userButtonBox: {
              display: 'flex',
              justifyContent: 'space-between',
              width: '100vw',
              padding: '10px',
            },
            avatarImage: {
              height: '50px',
              width: '50px',
            },
            avatarBox: {
              height: '50px',
              width: '50px',
            },
          },
        }}
      />
      <section className='px-4 py-6 space-y-6'>
        <div className='grid gap-4'>
          <Link
            href='#'
            className='flex items-center justify-between rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
            prefetch={false}
          >
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-primary p-2 text-primary-foreground'>
                <UserIcon className='h-5 w-5' />
              </div>
              <div>
                <p className='text-sm font-medium'>Account</p>
                <p className='text-xs text-muted-foreground'>
                  Manage your account settings
                </p>
              </div>
            </div>
            <ChevronRightIcon className='h-5 w-5 text-muted-foreground' />
          </Link>
          <Link
            href='#'
            className='flex items-center justify-between rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
            prefetch={false}
          >
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-primary p-2 text-primary-foreground'>
                <BellIcon className='h-5 w-5' />
              </div>
              <div>
                <p className='text-sm font-medium'>Notifications</p>
                <p className='text-xs text-muted-foreground'>
                  Manage your notification settings
                </p>
              </div>
            </div>
            <ChevronRightIcon className='h-5 w-5 text-muted-foreground' />
          </Link>
          <Link
            href='#'
            className='flex items-center justify-between rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
            prefetch={false}
          >
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-primary p-2 text-primary-foreground'>
                <LockIcon className='h-5 w-5' />
              </div>
              <div>
                <p className='text-sm font-medium'>Privacy</p>
                <p className='text-xs text-muted-foreground'>
                  Manage your privacy settings
                </p>
              </div>
            </div>
            <ChevronRightIcon className='h-5 w-5 text-muted-foreground' />
          </Link>
          <Link
            href='#'
            className='flex items-center justify-between rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
            prefetch={false}
          >
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-primary p-2 text-primary-foreground'>
                <SunIcon className='h-5 w-5' />
              </div>
              <div>
                <p className='text-sm font-medium'>Appearance</p>
                <p className='text-xs text-muted-foreground'>
                  Manage your appearance settings
                </p>
              </div>
            </div>
            <ChevronRightIcon className='h-5 w-5 text-muted-foreground' />
          </Link>
          <Card
            href='/admin/dashboard'
            icon={UserIcon}
            name='Are you an admin?'
            description='Manage your users'
          />
        </div>
      </section>
    </div>
  )
}

interface CardProps {
  href: string
  icon: ElementType
  name: string
  description: string
}

function Card({ href, icon: Icon, name, description }: CardProps) {
  return (
    <Link
      href={href}
      className='flex items-center justify-between rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
    >
      <div className='flex items-center gap-4'>
        <div className='rounded-full bg-primary p-2 text-primary-foreground'>
          <Icon className='h-5 w-5' />
        </div>
        <div>
          <p className='text-sm font-medium'>{name}</p>
          <p className='text-xs text-muted-foreground'>{description}</p>
        </div>
      </div>
      <ChevronRightIcon className='h-5 w-5 text-muted-foreground' />
    </Link>
  )
}
