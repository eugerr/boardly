import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from './_search-users'
import { clerkClient } from '@clerk/nextjs/server'
import { setRole } from './_actions'
import { Button } from '@/components/ui/button'

export default async function AdminDashboard(params: {
  searchParams: { search?: string }
}) {
  // If the user does not have the admin role, redirect them to the home page
  if (!checkRole('admin')) {
    redirect('/')
  }

  const query = params.searchParams.search

  const users = query
    ? (await clerkClient().users.getUserList({ query })).data
    : []

  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the `admin` role.</p>

      <SearchUsers />

      {users.map((user) => {
        return (
          <div key={user.id} className='border p-5 my-20 '>
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div>{user.publicMetadata.role as string}</div>
            <div>
              <form action={setRole}>
                <input type='hidden' value={user.id} name='id' />
                <input type='hidden' value='admin' name='role' />
                <Button type='submit'>Make Admin</Button>
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input type='hidden' value={user.id} name='id' />
                <input type='hidden' value='landlord' name='role' />
                <Button type='submit'>Make Landlord</Button>
              </form>
            </div>

            <div>
              <form action={setRole}>
                <input type='hidden' value={user.id} name='id' />
                <input type='hidden' value='user' name='role' />
                <Button type='submit'>Make User</Button>
              </form>
            </div>
          </div>
        )
      })}
    </>
  )
}
