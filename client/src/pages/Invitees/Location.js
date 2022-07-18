import React, { useEffect, useState } from 'react'
import Lists from '../../components/inviters/locations/Lists'
import Map from '../../components/inviters/locations/Map'
import NavBar from '../../components/inviters/locations/NavBar'
import { getPlacesData } from '../../api'

const Location = () => {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [bounds, setBounds] = useState({})
  const [ childClicked, setChildClicked ] = useState(null)

  const [type, setType ] = useState('restaurants')
  const [ rating, setRating ] = useState('')

  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter(place => place.rating >= rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setIsLoading(true)
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter(place => place.name))
          setIsLoading(false)
        })
    }
  }, [type, bounds])

  return (
    <div className="h-full w-full bg-slate-200 overflow-hidden">
        <NavBar setCoordinates={setCoordinates} />
        <div className="flex">
            <Lists
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              rating={rating}
              setType={setType}
              setRating={setRating}
            />
            <Map 
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
            />
        </div>
        
    </div>
  )
}

export default Location