import React, { useState, useEffect } from 'react'
import axios from 'axios';
import EventCard from './EventCard'
import jwtDecoder from 'jwt-decode';

const InviterEvent = () => { 
    const token = localStorage.getItem('token');
    const decodedData = jwtDecoder(token);
    const id = decodedData.id;

    const [events, setEvents] = useState([]);

    const request = async () => {
        const response = await axios.get(`http://localhost:5000/api/inviters/events/inviterevent/${id}`).catch(err => console.log(err));
        const data = response.data;
        return data
    }
    useEffect(() => {
        request().then(data => {
            setEvents(data.events.events)
        }).catch(err => console.log(err))
    })

    return (
        <div className="bg-white mt-10 max-w-7xl mx-auto rounded-3xl p-10 shadow-xl">
            <h1 className="text-3xl font-bold text-gray-800 my-5 mx-auto">Your events</h1>
            <div className="grid grid-cols-3 gap-3">
                {events ?
                    events.map((event, index) => (
                        <EventCard 
                            id={event._id}
                            key={index} 
                            eventName={event.eventName} 
                            eventDescription={event.eventDescription} 
                        />
                    ))
                    :
                    <p className="text-xl font-semibold text-gray-700">You do not have any events planned.</p>
                }
            </div>
        </div>
        
    );
}

export default InviterEvent;