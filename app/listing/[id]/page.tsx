import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
import { BedIcon, DollarSignIcon, StarIcon, WifiIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function ListingDetail({
  params,
}: {
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: listing } = await supabase
    .from('listing')
    .select()
    .eq('id', params.id)
    .single<Tables<'listing'>>()

  if (!listing) {
    return notFound()
  }

  const {
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
  } = listing

  return (
    <div className='flex flex-col pb-20'>
      <section className='relative h-[40vh] min-h-[200px] w-full overflow-hidden'>
        <Image
          src={listing.image_url!}
          alt='Boarding House'
          width={1600}
          height={900}
          className='h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-primary-foreground'>
          <h1 className='text-3xl font-bold sm:text-4xl md:text-5xl'>{name}</h1>
          <p className='mt-4 max-w-md text-sm sm:text-base'>{description}</p>
        </div>
      </section>
      <div className='container mx-auto px-4 py-10 sm:py-16 md:py-20'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16'>
          <div>
            <h2 className='text-2xl font-bold sm:text-3xl'>House Details</h2>
            <div className='mt-6 grid gap-6'>
              <div className='flex items-center gap-4'>
                <BedIcon className='h-6 w-6 text-primary' />
                <div>
                  <h3 className='text-lg font-semibold'>Rooms</h3>
                  <p className='text-muted-foreground'>
                    {rooms} rooms available
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <WifiIcon className='h-6 w-6 text-primary' />
                <div>
                  <h3 className='text-lg font-semibold'>Amenities</h3>
                  <p className='text-muted-foreground'>
                    Free WiFi, shared kitchen, laundry facilities
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <DollarSignIcon className='h-6 w-6 text-primary' />
                <div>
                  <h3 className='text-lg font-semibold'>Rent</h3>
                  <p className='text-muted-foreground'>$ {rent}</p>
                </div>
              </div>
            </div>
            <Button size='lg' className='mt-8'>
              Book Now
            </Button>
          </div>
          <div>
            <h2 className='text-2xl font-bold sm:text-3xl'>Reviews</h2>
            <ScrollArea className='mt-6 h-96 rounded-lg border'>
              <div className='space-y-6 p-4 sm:p-6 md:p-4'>
                <div className='flex flex-col sm:flex-row items-start gap-4'>
                  <Avatar className='h-12 w-12 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='space-y-2 flex-1'>
                    <div className='flex items-center gap-2'>
                      <div className='font-medium'>John Doe</div>
                      <div className='flex items-center gap-1 text-xs font-semibold'>
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-muted stroke-muted-foreground' />
                      </div>
                    </div>
                    <p className='text-muted-foreground'>
                      The boarding house was a great find! The room was clean
                      and comfortable, and the shared amenities were
                      well-maintained. The staff was friendly and helpful. I
                      would definitely stay here again.
                    </p>
                  </div>
                </div>
                <div className='flex flex-col sm:flex-row items-start gap-4'>
                  <Avatar className='h-12 w-12 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='space-y-2 flex-1'>
                    <div className='flex items-center gap-2'>
                      <div className='font-medium'>Jane Smith</div>
                      <div className='flex items-center gap-1 text-xs font-semibold'>
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                      </div>
                    </div>
                    <p className='text-muted-foreground'>
                      I had a wonderful stay at this boarding house. The
                      location was perfect, and the facilities were top-notch.
                      The staff went above and beyond to make my stay
                      comfortable. I highly recommend this place.
                    </p>
                  </div>
                </div>
                <div className='flex flex-col sm:flex-row items-start gap-4'>
                  <Avatar className='h-12 w-12 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='space-y-2 flex-1'>
                    <div className='flex items-center gap-2'>
                      <div className='font-medium'>Michael Johnson</div>
                      <div className='flex items-center gap-1 text-xs font-semibold'>
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-primary' />
                        <StarIcon className='h-4 w-4 fill-muted stroke-muted-foreground' />
                        <StarIcon className='h-4 w-4 fill-muted stroke-muted-foreground' />
                      </div>
                    </div>
                    <p className='text-muted-foreground'>
                      The boarding house was a decent place to stay. The room
                      was clean and the shared facilities were well-maintained.
                      However, the noise from the street was a bit of an issue
                      for me. Overall, it was an average experience.
                    </p>
                  </div>
                </div>
              </div>
              <ScrollBar orientation='vertical' />
            </ScrollArea>
          </div>
        </div>
      </div>{' '}
      <div className='container mx-auto px-4 py-10 sm:py-16 md:py-20'>
        <h2 className='text-2xl font-bold sm:text-3xl'>Owner Info</h2>
        <div className='mt-6 grid gap-6'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-12 w-12 border'>
              <AvatarImage src='/placeholder-user.jpg' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className='text-lg font-semibold'>{owner_name}</h3>
              <p className='text-muted-foreground'>Owner of {name}</p>
              <p className='text-muted-foreground'>{owner_contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
