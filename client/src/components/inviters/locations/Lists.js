import React, { useState, useEffect, createRef } from 'react'
import PlaceDetail from './PlaceDetail'
import ClipLoader from 'react-spinners/ClipLoader'

const Lists = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  
  const [ elRefs, setElRefs ] = useState([])
  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, index) => elRefs[index] ||  createRef())
    setElRefs(refs)
  }, [places])


  return (
    <div className="w-1/4 h-screen p-5">
      <h2 className="font-semibold text-lg">Restaurants, Hotels or Attractions around you</h2>

      {isLoading ? (
      <div className="text-center">
        <div className="spinner mx-auto">
          <ClipLoader size={50} color={'#7e5ac1'} loading={isLoading} />
        </div>
      </div>
      ) : (
        <>
          <form className="mt-5">
            <div className="flex -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">Type</label>
                <select 
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="restaurants">Restaurants</option>
                  <option value="hotels">Hotels</option>
                  <option value="attractions">Attractions</option>
                </select>
              </div>
              <div className="w-full px-3">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">Rating</label>
                <select 
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value={0}>All</option>
                  <option value={3}>Above 3.0</option>
                  <option value={4}>Above 4.0</option>
                  <option value={4.5}>Above 4.5</option>
                </select>
              </div>
              </div>
          </form>
          <div className="container h-3/4 rounded-lg overflow-y-scroll">
            {places?.map((place, index) => (
              <div className="flex items-center" key={index}>
                <PlaceDetail 
                  place={place} 
                  selected = {Number(childClicked) === index}
                  refProp = {elRefs[index]}
                />
              </div>
            ))}
          </div>
        </>
      )
      }
      

     
    </div>
  )
}

export default Lists
