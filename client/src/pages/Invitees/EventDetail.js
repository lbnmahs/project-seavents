import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const EventDetail = () => {
  // eslint-disable-next-line no-unused-vars
  const [event, setEvent] = useState()
  const { id } = useParams()
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    window.location.replace("/inviters/auth")
  }
  // handling the event form to be updated
  const [ inputs, setInputs ] = useState({})
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...inputs,
      [e.target.name]: e.target.value
    }))
  }
  const fetchEventDetails = async() => {
    const res = await axios.get(`http://localhost:5000/api/inviters/events/${id}`).catch(err => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(() => {
    fetchEventDetails().then(data => {
      setEvent(data.event)
      setInputs({
        eventName: data.event.eventName,
        eventDescription: data.event.eventDescription,
        eventDate: data.event.eventDate,
        eventTime: data.event.eventTime,
        eventType: data.event.eventType,
        adults: data.event.adults,
        children: data.event.children,
        budget: data.event.budget,

      })
    }).catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/inviters/events/update/${id}`, {
      eventName: inputs.eventName,
      eventDescription: inputs.eventDescription,
      eventDate: inputs.eventDate,
      eventTime: inputs.eventTime,
      eventType: inputs.eventType,
      adults: inputs.adults,
      children: inputs.children,
      budget: inputs.budget,
    }).catch(err => console.log(err))
    const data = await res.data
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    sendRequest().then(() => {
      toast.success('Event updated!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }).then(() => navigate('/inviter/home'))
  }
  
  return (
    <div className="h-full bg-gray-200 w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/two.png')"  }}>
      <nav className="flex justify-around items-center bg-white mx-auto sticky top-0">
        <Link to="/inviter/home" className="font-bold italic text-blue-500 text-xl p-6">Sea<span className="text-purple-500">vents</span></Link>
        <button onClick={logout} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">Logout</button>
      </nav>
      <ToastContainer />
      <div className="flex justify-center items-center mx-auto my-4">
        <h1 className="text-4xl font-semibold">Update an Event</h1>
      </div>

      <div className="max-w-5xl bg-white shadow-xl rounded-3xl flex p-10 mx-auto">
      {inputs && 
        <form className="mt-4 w-full flex flex-col mx-auto" onSubmit={handleSubmit} autoComplete="off">
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
                value={inputs.eventName}
                onChange={handleChange}
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
                value={inputs.eventType}
                onChange={handleChange}
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
              value = {inputs.eventDescription}
              onChange={handleChange}

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
              value = {inputs.budget}
              onChange={handleChange}
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
                value = {inputs.eventDate}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 pl-2">
              <label className="block text-base font-semibold mb-2" htmlFor="eventTime">Time</label>
              <input
                className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
                type="time"
                name="eventTime"
                required
                value = {inputs.eventTime}
                onChange={handleChange}
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
                value = {inputs.adults}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 pl-2">
              <label className="block text-base font-semibold mb-2" htmlFor="children">Children</label>
              <input
                className="rounded-lg bg-gray-200 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"
                type="number"
                name="children"
                required
                value = {inputs.children}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button 
            className="rounded-lg flex items-center justify-center py-3 px-10 bg-purple-500 text-white text-lg"
            type="submit"
          >Save Event Details</button>
        </form>
      }
      </div>

    </div>
  )
}

export default EventDetail
