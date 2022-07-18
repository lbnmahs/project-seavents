import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewEvent = () => {
    const [event, setEvent] = useState({});
    const { id } = useParams();

    const fetchEventDetails = async () => {
        const res = await axios.get(`http://localhost:5000/api/inviters/events/${id}`).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        fetchEventDetails().then(data => {
            setEvent(data.event);
        }).catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    console.log(event);

  return (
    <div className="w-full h-screen bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/assets/images/two.png')"}}>
        <div className="max-w-5xl bg-white rounded-lg p-8 flex flex-col">
            <div className="flex flex-col items-center justify-center mb-12">
                <h1 className="font-semibold text-2xl my-2">{event.eventName}</h1>
                <p className="text-gray-500 font-semibold text-base pl-2">{event.eventType}</p>
                <p className="text-gray-700 text-lg">{event.eventDescription}</p> 
            </div>
            <div className="flex mb-4">
                <p className="text-gray-700 text-lg font-bold pr-5">Event Date:<span className="font-normal pl-4">{event.eventDate}</span></p>
                <p className="text-gray-700 text-lg font-bold">Event Start Time: <span className="font-normal pl-4">{event.eventTime}</span></p>
            </div>
        </div>
    </div>
  )
}

export default ViewEvent