import React from 'react'

const EventCard = ({eventName, eventDescription}) => {
  return (
    <div>
      <div className="max-w-sm bg-white shadow-xl border border-gray-400 rounded-lg">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{eventName}</h5>
          <p className="mb-3 font-normal text-gray-700">{eventDescription}</p>
        </div>
      </div>
    </div>
    
  )
}

export default EventCard
