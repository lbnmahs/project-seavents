import React, { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Authentication = () => {
  const [isSignup, setIsSignup] = useState(false);
  const changeForm = () => {
      setIsSignup((change) => !change);
  };
  return (
    <section className="h-screen flex">
      {/* LEFT IMAGE */}
      <div
        className="hidden w-1/2 bg-cover flex-col justify-center items-center bg-center brightness-90 lg:flex"
        style={{ backgroundImage: isSignup ? "url('/assets/images/vendor1.jpg')" : "url('/assets/images/vendor2.jpg')"  }}
      >
        <div className="p-5 flex flex-col justify-center items-center">
          <h1 className="font-semibold text-4xl mb-6 text-center">{isSignup ? "Welcome to Seavents" : "Welcome back to Seavents"}</h1>
          <p>Your number 1 event planning system.</p>
        </div>
        
      </div>

      {/* RIGHT DIV */}
      <div className="block p-10 w-full max-w-3xl mx-auto sm:flex sm:flex-col sm:w-full">
        <h1 className="text-4xl font-bold mb-5">{isSignup ? "Sign Up" : "Sign In"}</h1>
        <div className="h-1 w-20 mr-6 bg-purple-500 rounded-sm"></div>

        <form className="mt-10 flex flex-col justify-center">
          <div className="mb-10">
            <label className="block text-base font-semibold mb-2" htmlFor="location">
                Name of Location
            </label>
            <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" type="text" placeholder="Name of Location" />
          </div>
          <div className="mb-10">
            <label className="block text-base font-semibold mb-2" htmlFor="email">
                Email
            </label>
            <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" type="email" placeholder="Email" />
          </div>

          {
            isSignup ?
            <>
              <div className="flex flex-wrap mb-10">
                <div className="w-full md:w-1/2 pr-3  mb-6 md:mb-0">
                  <label className="block text-base font-semibold mb-2" for="grid-first-name">
                    First phone number
                  </label>
                  <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" id="grid-first-name" type="number" placeholder="First Phone Number" />
                  
                </div>
                <div className="w-full md:w-1/2 pl-2">
                  <label className="block text-base font-semibold mb-2" for="grid-last-name">
                    Second phone number
                  </label>
                  <input class="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" id="grid-last-name" type="number" placeholder="Second Phone Number" />
                </div>
              </div>

              <div className="flex flex-wrap mb-10">
                <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-2">
                  <label className="block text-base font-semibold mb-2" for="grid-first-name">
                    Password
                  </label>
                  <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" id="grid-first-name" type="password" placeholder="Password" />
                  
                </div>
                <div class="w-full md:w-1/2 pl-2">
                  <label className="block text-base font-semibold mb-2" for="grid-last-name">
                    Repeat password
                  </label>
                  <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" id="grid-last-name" type="password" placeholder="Repeat Password" />
                </div>
              </div>
            </>
            :
            <div className="w-full mr-0 mb-12 sm:mr-10">
              <label className="block text-base font-semibold mb-2" htmlFor="password">
                  Password
              </label>
              <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" type="password" placeholder="Phone Number" />
            </div>
          }

          <button className="flex items-center justify-center py-3 px-10 bg-purple-500 text-white text-lg rounded-lg">
              {isSignup ? "Sign Up" : "Sign In"}
              <HiArrowRight style={{ fontSize: '20px', marginLeft: '10px' }} />
          </button>
          <Link to="/vendors/auth" onClick={changeForm} className="flex mt-10 items-center justify-center py-3 px-10 bg-black text-white text-lg rounded-lg">
              {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Link>

        </form>

      </div>
    </section>
  )
}

export default Authentication