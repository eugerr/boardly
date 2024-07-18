import { useState, useEffect } from 'react'

interface Location {
  latitude: number | null
  longitude: number | null
}

const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  })
  const [error, setError] = useState<string | null>(null)
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState>('prompt')

  const handleSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords
    setLocation({ latitude, longitude })
    setError(null)
  }

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message)
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      setPermissionStatus(result.state)

      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
      } else if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
      }

      result.onchange = () => {
        setPermissionStatus(result.state)
      }
    })
  }, [])

  return { location, error, permissionStatus }
}

export default useGeolocation
