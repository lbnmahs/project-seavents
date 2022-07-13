import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode'

const CreateEvent = () => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.replace("/inviters/auth")
  }
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [adults, setAdults] = useState('')
  const [children, setChildren] = useState('')
  const [ budget, setBudget ] = useState('')
  const [ eventType, setEventType ] = useState('')

  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  const userId = decoded.id

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/inviters/events/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ eventName, eventDate, eventTime, eventLocation, eventDescription, eventType, adults, children, budget, userId })
    })
    const data = await response.json()
    if(data.message === 'Event created'){
      toast.success('Event created', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      window.location.replace("/inviters/home")
    }else{
      toast.error('Something went wrong', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className="h-full bg-gray-200 w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/two.png')"  }}>
      <nav className="flex justify-around items-center bg-white mx-auto sticky top-0">
        <Link to="/inviter/home" className="font-bold italic text-blue-500 text-xl p-6">Sea<span className="text-purple-500">vents</span></Link>
        <button onClick={logout} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">Logout</button>
      </nav>
      <ToastContainer />
      <div className="flex justify-center items-center mx-auto my-4">
        <h1 className="text-4xl font-semibold">Create an Event</h1>
      </div>

      <div className="max-w-5xl bg-white shadow-xl rounded-3xl flex p-10 mx-auto">
        <form className="mt-4 w-full flex flex-col mx-auto" onSubmit={handleSubmit}>
          <div className="mb-10 flex flex-wrap">
            <div className="w-full md:w-1/2 pr-3 mb-6 md:mb-0">
              <label className="block text-base font-semibold mb-2" htmlFor="eventName">
                Name of the Event
              </label>
              <input 
                className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" 
                type="text" 
                placeholder="Name of Event" 
                name="eventName"
                required
                value={eventName}
                onChange = {(e) => setEventName(e.target.value)}

              />
            </div>
            <div className="w-full md:w-1/2 pl-2">
              <label className="block text-base font-semibold mb-2" htmlFor="eventType">
                Event Type
              </label>
              <input
                className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
                type="text"
                placeholder="Event Type"
                name="eventType"
                required
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}

              />
            </div>
          </div>
         
          <div className="mb-10">
            <label className="block text-base font-semibold mb-2" htmlFor="eventDescription">
              Event Description
            </label>
            <input 
              className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" 
              type="text" 
              placeholder="Event Description" 
              name="eventDescription"
              required
              value={eventDescription}
              onChange = {(e) => setEventDescription(e.target.value)}

            />
          </div>
          <div className="mb-10">
            <label className="block text-base font-semibold mb-2" htmlFor="budget">Budget</label>
            <input
              className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
              type="number"
              placeholder="Budget"
              name="budget"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="mb-10 flex flex-wrap">
            <div className="w-full md:w-1/2 pr-3 mb-6 md:mb-0">
              <label className="block text-base font-semibold mb-2" htmlFor="eventDate">Date</label>
              <input
                className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
                type="date"
                name="eventDate"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}

              />
            </div>
            <div className="w-full md:w-1/2 pl-2">
              <label className="block text-base font-semibold mb-2" htmlFor="eventTime">Time</label>
              <input
                className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
                type="time"
                name="eventTime"
                required
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-10 flex flex-wrap">
            <div className="w-full md:w-1/2 pr-3 mb-6 md:mb-0">
              <label className="block text-base font-semibold mb-2" htmlFor="adults">Adult guests</label>
              <input
                className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
                type="number"
                name="adults"
                required
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 pl-2">
              <label className="block text-base font-semibold mb-2" htmlFor="children">Children</label>
              <input
                className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
                type="number"
                name="children"
                required
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-10">
            <label className="block text-base font-semibold mb-2" htmlFor="eventLocation">Location</label>
            <input
              className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
              type="text"
              placeholder="Location"
              name="eventLocation"
              required
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />
          </div>

          <button 
            className="rounded-lg flex items-center justify-center py-3 px-10 bg-purple-500 text-white text-lg"
            type="submit"
          >Save Event Details</button>
        </form>
      </div>

    </div>
  )
}

export default CreateEvent
