import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Tables } from '@/types/supabase'

export default async function Component() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: listing } = await supabase.from('listing').select()

  console.log(listing)

  return (
    <div className='flex flex-col min-h-dvh'>
      <main className='flex-1'>
        <section className='bg-primary py-12 md:py-20 text-center text-primary-foreground'>
          <div className='container px-4'>
            <h1 className='text-3xl font-bold md:text-5xl'>
              Find Your Perfect Boarding House
            </h1>
            <p className='mt-4 text-lg md:text-xl'>
              Discover cozy and affordable boarding houses near you.
            </p>
            <div className='mt-8'>
              <Link
                href='#'
                className='inline-flex items-center justify-center rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2'
                prefetch={false}
              >
                Find Boarding Houses
              </Link>
            </div>
          </div>
        </section>
        <section className='py-12 md:py-20 pb-20'>
          <div className='container px-4'>
            <h2 className='text-2xl font-bold md:text-3xl'>
              Explore Our Boarding Houses
            </h2>
            {listing ? (
              <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {listing.map((house) => (
                  <Card {...house} key={house.id} />
                ))}
              </div>
            ) : (
              <p>No listing found</p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

function Card({
  address,
  created_at,
  description,
  id,
  image_url,
  latitude,
  longitude,
  name,
  owner_contact,
  owner_name,
  rent,
  rooms,
  user_id,
}: Tables<'listing'>) {
  console.log(image_url)
  return (
    <Link
      href={`/listing/${id}`}
      className='rounded-lg border bg-white shadow-sm'
    >
      <div className='relative aspect-video'>
        <Image
          src={image_url!}
          alt='Boarding House'
          fill
          className='h-48 w-full rounded-t-lg object-cover'
        />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-medium'>Cozy Boarding House</h3>
        <p className='mt-2 text-muted-foreground'>
          Comfortable and affordable boarding house in the heart of the city.
        </p>
        <div className='mt-4 flex justify-between items-center'>
          <p className='text-lg'>2 Beds</p>
          <Button variant='outline' className='text-lg shadow-lg'>
            $ 900
          </Button>
        </div>
      </div>
    </Link>
  )
}
