import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const LandingPage = () => {
  return (
    <>
      <section className="w-screen h-screen overflow-x-hidden bg-fixed bg-cover bg-center bg-no-repeat flex flex-col" style={{ backgroundImage: "url('/assets/images/landing1.jpg')" }}>
        <nav className="flex justify-between pt-4 px-20 items-center">
          <Link to="/" className="font-bold italic text-blue-500 text-xl">Sea<span className="text-purple-500">vents</span></Link>
          <ul className="flex items-center">
            <li className="px-10">FaQs</li>
            <li className="px-10">About Us</li>
            <li className="px-10">Contact Us</li>
            <li className="px-10">How to</li>
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="mt-50 ml-20 max-w-2xl mt-44"
         >
          <h1 className="font-semibold text-6xl leading-normal mb-12">Event Planning has never been easier and faster</h1>
          <Link to="/inviters/auth" className="py-3 px-6 bg-black text-white rounded-xl hover:bg-purple-500 duration-700">Start planning</Link>
        </motion.div>
      </section>

      <section className="w-screen h-screen overflow-y-hidden overflow-x-hidden flex justify-center items-center">
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, type: "spring" }}
        className="p-40 border w-11/12 h-5/6 rounded-3xl bg-cover bg-no-repeat bg-center bg-brightness-75 drop-shadow-lg flex flex-col justify-start items-center" 
        style={{ backgroundImage: "url('/assets/images/landing2.jpg')" }}
        >
          <h1 className="mb-7 font-bold text-6xl">Share your Space</h1>
          <p className="mb-10">Let people use your space to hold events and have fun.</p>
          <Link to="/vendors/auth" className="py-3 px-6 bg-black text-white rounded-xl hover:bg-purple-500 duration-700">Share space</Link>
        </motion.div>
      </section>
    </>
    
  )
}

export default LandingPage