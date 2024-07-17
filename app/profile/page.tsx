import { UserButton } from '@clerk/nextjs'
import React from 'react'

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
    </div>
  )
}
