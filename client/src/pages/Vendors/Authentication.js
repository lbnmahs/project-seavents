import React, { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Authentication = () => {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false);
  const changeForm = () => {
    setIsSignup((change) => !change);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [firstPhoneNumber, setFirstPhoneNumber] = useState('');
  const [secondPhoneNumber, setSecondPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSignup){
      const response = await fetch('http://localhost:5000/api/vendors/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({vendorName, email, firstPhoneNumber, secondPhoneNumber, password})
      })
      const data = await response.json()
      if(data.message === 'Vendor created'){
        toast.success('Sign Up successfull', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        navigate('/vendors/home')
      }
    }else{
      const response = await fetch('http://localhost:5000/api/vendors/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
      const data = await response.json()
      if(data.vendor){
        localStorage.setItem('token', data.vendor)
        toast.success('Login successful', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        
        window.location.href = '/vendor/home';
      }else{
        toast.error('Invalid email or password', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
      }
    }
  }
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
        <ToastContainer />

        <form className="mt-10 flex flex-col justify-center" onSubmit = {handleSubmit}>
          
          <div className="mb-10">
            <label className="block text-base font-semibold mb-2" htmlFor="email">
                Email
            </label>
            <input 
              className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" 
              type="email" 
              placeholder="Email" 
              name="email"
              value={email}
              required
              onChange = {(e) => setEmail(e.target.value)}
            />
          </div>

          {
            isSignup ?
            <>
              <div className="mb-10">
                <label className="block text-base font-semibold mb-2" htmlFor="location">
                    Name of Venue
                </label>
                <input 
                  className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" 
                  type="text" 
                  placeholder="Name of Location" 
                  name="vendorName"
                  value={vendorName}
                  required
                  onChange = {(e) => setVendorName(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap mb-10">
                <div className="w-full md:w-1/2 pr-3  mb-6 md:mb-0">
                  <label className="block text-base font-semibold mb-2" htmlFor="grid-first-name">
                    First phone number
                  </label>
                  <input 
                    className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"  
                    type="tel" 
                    placeholder="First Phone Number" 
                    name="firstPhoneNumber"
                    value={firstPhoneNumber}
                    required
                    onChange = {(e) => setFirstPhoneNumber(e.target.value)}
                  />
                  
                </div>
                <div className="w-full md:w-1/2 pl-2">
                  <label className="block text-base font-semibold mb-2" htmlFor="grid-last-name">
                    Second phone number
                  </label>
                  <input 
                    className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500"  
                    type="tel" 
                    placeholder="Second Phone Number" 
                    name="secondPhoneNumber"
                    value={secondPhoneNumber}
                    required
                    onChange = {(e) => setSecondPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mr-0 mb-12 sm:mr-10">
                <label className="block text-base font-semibold mb-2" htmlFor="password">
                    Password
                </label>
                <input 
                  className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" 
                  type="password" 
                  placeholder="Phone Number" 
                  name="password"
                  value={password}
                  required
                  onChange = {(e) => setPassword(e.target.value)}
                />
              </div>
            </>
            :
            <div className="w-full mr-0 mb-12 sm:mr-10">
              <label className="block text-base font-semibold mb-2" htmlFor="password">
                  Password
              </label>
              <input 
                className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" 
                type="password" 
                placeholder="Phone Number" 
                name="password"
                value={password}
                required
                onChange = {(e) => setPassword(e.target.value)}
              />
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