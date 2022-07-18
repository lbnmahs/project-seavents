import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Autocomplete } from '@react-google-maps/api' 


const NavBar = ({ setCoordinates }) => {
  const [autoComplete, setAutoComplete] = useState(null)
  const onLoad = (autoC) => setAutoComplete(autoC)
  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat()
    const lng = autoComplete.getPlace().geometry.location.lng()
    setCoordinates({ lat, lng })
  }
  return (
    <nav className="flex justify-around items-center bg-white mx-auto sticky">
      <Link to="/" className="font-bold italic text-blue-500 text-xl p-6">Sea<span className="text-purple-500">vents</span></Link>
      <div>
        
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> 
          <input className="bg-gray-200 focus:outline-none focus:shadow-outline rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="Search a location" />
        </Autocomplete>
      </div>
    </nav>
  )
}

export default NavBar
