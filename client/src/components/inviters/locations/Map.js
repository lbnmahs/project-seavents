import React from 'react'
import GoogleMapReact from 'google-map-react'

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
    
    return (
        <div className="w-3/4" style={{ height: '90vh' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                options={''}
                onChange={(e) => {
                  setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                  setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
              {places?.map((place, index) => (
                <div 
                  className="absolute z-10 hover:z-20"
                  style={{ height: '85vh', transform: 'translate(-50%, -50%)' }}
                  lat={Number(place.latitude)}
                  lng={Number(place.longitude)}
                  key={index}
                >
                  <div className="shadow-xl bg-white flex items-center p-2 rounded-lg cursor-pointer">
                    <h4 className="text-sm font-semibold text-center">{place.name}</h4>
                    <img 
                      className=" w-12 h-12 rounded-full"
                      src={place.photo ? place.photo.images.small.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} 
                      alt={place.name}
                    />
                  </div>
                </div>
              ))}
            </GoogleMapReact>
        </div>
            
  )
}

export default Map