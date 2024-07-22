import { cookies } from 'next/headers'
import { MapboxMap } from './_components/custom-map'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Tables } from '@/types/supabase'

export default async function Map() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.from('listing').select()

  const listingData = data || [] // Provide a default empty array if data is null
  return (
    <div className='h-screen w-screen'>
      <MapboxMap data={listingData} />
    </div>
  )
}
