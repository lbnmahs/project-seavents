import React from 'react'

const PlaceDetail = ({ place, selected, refProp }) => {
  if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  
  return (
    <div className="bg-white shadow-xl w-full m-2 p-3 rounded-md">
      <img className="h-48 w-full rounded-lg" 
        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} 
        alt={place.name}
      />
      <div className="p-2">
        <h2 className="font-regular text-lg mb-3">{place.name}</h2>
        <div className="flex justify-between">
          <h4 className="font-semibold">Pricing</h4>
          <h4>{place.price}</h4>
        </div>
        <div className="flex justify-between">
          <h4 className="font-semibold">Rating</h4>
          <h4>{place.rating}</h4>
        </div>
        <div className="flex justify-between">
          <h4 className="font-semibold">Ranking</h4>
          <h4>{place.ranking}</h4>
        </div>
        <div className="flex flex-wrap my-3">
        {
          place?.cuisine?.map(({ name }) => (
            <div className="bg-gray-400 rounded-full py-1 px-2 mr-2 mb-2" key={name}>
              <span className="text-xs text-gray-200">{name}</span>
            </div>
          ))
        }
        {
          place?.address && (
            <div className="flex justify-between items-start mt-3">
              <h4 className="font-semibold">Location</h4>
              <h4 className="ml-5">{place.address}</h4>
            </div>
          )
        }
        {
          place?.phone && (
            <div className="flex justify-between items-center my-6">
              <h4 className="font-semibold">Contact</h4>
              <h4 className="ml-5">{place.phone}</h4>
            </div>
          )
        }
        <div className="my-4 flex justify-between">
          <button className="py-2 px-4 bg-green-500 text-white rounded-lg" onClick={() => window.open(place?.web_url)}>More Info</button>
          <button className="py-2 px-4 bg-purple-500 text-white rounded-lg ml-4" onClick={() => window.open(place.website)}>Location website</button>
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default PlaceDetail
