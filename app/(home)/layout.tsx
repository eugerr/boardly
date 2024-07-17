import HomeNav from '@/components/home-nav'
import React, { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <HomeNav />
      {children}
    </main>
  )
}
