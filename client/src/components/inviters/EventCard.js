import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const EventCard = ({eventName, eventDescription, id}) => {
  const navigate = useNavigate()
  const handleEdit = (e) => {
    navigate(`/myEvent/${id}`)
  }
  const handleView = (e) => {
    navigate(`/event/${id}`)
  }
  const deleteEvent = async () => {
    const res = await axios.delete(`http://localhost:5000/api/inviters/events/${id}`).catch(err => console.log(err))
    const data = await res.data
    return data
  }
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        deleteEvent().then(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          
        }).then(() => navigate('/')).then(() => navigate('/inviter/home')).catch(err => console.log(err))
      }else {
        Swal.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  }
  return (
    <div>
      <div className="max-w-sm bg-white shadow-xl border border-gray-400 rounded-lg h-60 flex flex-col items-start justify-center">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{eventName}</h5>
          <p className="font-normal text-gray-700">{eventDescription}</p>
        </div>
        <div className="py-2 px-3 mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded-lg" onClick={handleView}>View</button>
          <button 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 mr-4 rounded-lg"
            onClick={handleEdit}
          >Edit</button>
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleDelete}
          >Delete</button>
        </div>
      </div>
    </div>
    
  )
}

export default EventCard
