'use client'

import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useGeolocation from '@/hooks/useGeolocation'

export function MapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null)

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
      // map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right')
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

      // Add your custom markers and lines here
      map.on('click', (e) => {
        alert(`A click event has occurred at ${e.lngLat}`)
      })

      new mapboxgl.Marker()
        .setLngLat([123.15111472299711, 11.46029403493869])
        .addTo(map)

      // Clean up on unmount
      return () => map.remove()
    }
  }, [])

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
