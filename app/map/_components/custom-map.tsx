'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useGeolocation from '@/hooks/useGeolocation'
import { Tables } from '@/types/supabase'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button, buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface MapboxMapProps {
  data: Tables<'listing'>[]
}

export function MapboxMap({ data }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Tables<'listing'> | null>(
    null
  )

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYXprcml2ZW4xNiIsImEiOiJjbGhma3IxaWcxN3c3M2VyM3VhcGsxcHk3In0.pto_0eshW9NHMP-m1O_blg'

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [123.15111472299711, 11.46029403493869],
        zoom: 18,
        maxZoom: 15,
      })

      // Add controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-left')
      // map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        'top-right'
      )

      data.map((item: Tables<'listing'>) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([Number(item.longitude), Number(item.latitude)])
          .addTo(map)

        marker.getElement().addEventListener('click', () => {
          setSelectedItem(item)
          setDrawerOpen(true)
        })
      })

      // Clean up on unmount
      return () => map.remove()
    }
  }, [data])

  const { location, error, permissionStatus } = useGeolocation()

  return (
    <>
      {!location ||
        error ||
        (permissionStatus === 'denied' && (
          <MapErrorCatcher
            location={location}
            error={error}
            permissionStatus={permissionStatus}
          />
        ))}
      <div ref={mapContainer} className='h-full w-full' />

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='mb-5 text-2xl font-semibold'>
              {selectedItem?.name || 'Details'}
            </DrawerTitle>
            <DrawerDescription>
              {selectedItem ? (
                <>
                  <div className='relative h-[40vh] min-h-[200px] w-full overflow-hidden'>
                    <Image
                      src={selectedItem.image_url!}
                      alt='Boarding House'
                      width={1600}
                      height={900}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                  <p className='mt-5 text-lg font-semibold'>
                    $ {selectedItem.rent} per month
                  </p>
                </>
              ) : (
                <p>No item selected.</p>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Link
              href={`/listing/${selectedItem?.id}`}
              className={buttonVariants()}
            >
              More Info
            </Link>

            <Button variant='secondary' onClick={() => setDrawerOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

interface Location {
  latitude: number | null
  longitude: number | null
}

interface MapErrorCatcherProps {
  error: string | null
  permissionStatus: PermissionState
  location: Location
}

function MapErrorCatcher({
  error,
  location,
  permissionStatus,
}: MapErrorCatcherProps) {
  return (
    <div className='absolute inset-0 z-10 bg-red-500'>
      {error && <p>Error: {error}</p>}
      {permissionStatus === 'prompt' && <p>Please enable location services.</p>}
      {permissionStatus === 'denied' && (
        <p>
          Location access denied. Please enable it in your browser settings.
        </p>
      )}
      <h1>Your Location</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  )
}
