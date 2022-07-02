import React, { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from 'react-spinners/PulseLoader'

const Auth = () => {
    
    const [isSignup, setIsSignup] = useState(false);
    const changeForm = () => {
        setIsSignup((change) => !change);
    };
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isSignup){
            const response = await fetch('http://localhost:5000/api/inviters/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userName, email, password})
            })
            const data = await response.json()
            if(data.message === 'Inviter created'){
                toast.success('Sign Up successfull', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                navigate('/inviters/auth')
            }
        }else{
            const response = await fetch('http://localhost:5000/api/inviters/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })
            const data = await response.json()
            if(data.inviter){
                localStorage.setItem('token', data.inviter)
                toast.success('Login successful', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                
                window.location.href = '/home';
            }else{
                toast.error('Invalid email or password', {
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
       
    };
    const [loading, setLoading] = useState(true)
    const switchLoader = () => {
        console.log("Changed")
        setLoading((change) => !change);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');



    return (
        <div className="flex h-screen">
            {/* LEFT SIDE WITH IMAGE */}
            <div 
                className="hidden w-1/2 bg-cover bg-center brightness-90 lg:flex"
                style={{ backgroundImage: isSignup ? "url('/assets/images/img1.jpg')": "url('/assets/images/img2.jpg')" }} 
            ><Link to="/" className="font-bold italic text-blue-500 text-xl p-6">Sea<span className="text-purple-500">vents</span></Link></div> 
        

            {/* RIGHT SIDE WITH FORM */}
            <div className="block p-10 w-full max-w-2xl mx-auto sm:flex sm:flex-col sm:w-full">
                <h1 className="text-4xl font-bold">{isSignup ? "Sign Up" : "Sign In"}</h1>
                <div className="h-1 w-20 my-7 bg-purple-500 rounded-sm"></div>
                <ToastContainer />

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col justify-center">
                    {
                        isSignup ?
                        <div className="mb-10 flex-col items-center justify-around sm:flex-row">
                            <div className="w-full mr-0 mb-10 sm:mr-10">
                                <label className="block text-base font-semibold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input 
                                    className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" 
                                    type="text" 
                                    placeholder="UserName" 
                                    name="userName"
                                    value={userName}
                                    required
                                    onChange = {(e) => setUserName(e.target.value)}
                                />
                            </div>

                            <div className="w-full">
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

                        </div>
                        :
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
                    }
                    <div className="mb-14">
                        <label className="block text-base font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            value={password}
                            required
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    
                    <button className="rounded-lg" onCLick={switchLoader}>
                        {
                            loading?
                                <div className="flex items-center justify-center py-3 px-10 bg-purple-500 text-white text-lg rounded-lg">
                                    {isSignup ? "Sign Up" : "Sign In"}
                                    <HiArrowRight style={{ fontSize: '20px', marginLeft: '10px' }} /> 
                                </div> 
                            :
                                <div>
                                    <PulseLoader size={10} color={"#fff"} />
                                </div>
                        }
                        
                    </button>
                    <Link to="/inviters/auth" onClick={changeForm} className="flex mt-6 items-center justify-center py-3 px-10 bg-black text-white text-lg rounded-lg">
                        {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Auth
