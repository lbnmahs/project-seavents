import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const LandingPage = () => {
  return (
    <>
      <section className="w-screen h-screen overflow-x-hidden bg-fixed bg-cover bg-center bg-no-repeat flex flex-col" style={{ backgroundImage: "url('/assets/images/landing1.jpg')" }}>
        <nav className="flex justify-between pt-4 px-20 items-center">
          <Link to="/" className="font-bold italic text-blue-500 text-xl">Sea<span className="text-purple-500">vents</span></Link>
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
    </>
    
  )
}

export default LandingPage