import React, { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Auth = () => {
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const changeForm = () => {
        setIsSignup((change) => !change);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = isSignup ? 'http://localhost:4000/api/inviters' : 'http://localhost:4000/api/inviters/auth';
            const { data: res } = await axios.post(url, data);
            if(isSignup){
                navigate('/inviters/auth');
            }
            else{
                localStorage.setItem('token', res.data);
                window.location='/home';
            }
            console.log(res.message);
        }catch(error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                setError(error.response.data.message);
            }
        }
    };

    const [data, setData] = useState(isSignup ? {userName: '', email: '', password: ''} : {email: '', password: ''});
    const handleChange = ({ currentTarget: input }) => {
        setData({
            ...data,
            [input.name]: input.value,
        })
    }

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
                                    value={data.userName}
                                    required
                                    onChange={handleChange}
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
                                    value={data.email}
                                    required
                                    onChange={handleChange}
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
                                value={data.email}
                                required
                                onChange={handleChange}
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
                            value={data.password}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {
                        error && <p className="text-red-500 text-sm">{error}</p>
                    }
                    
                    <button className="flex items-center justify-center py-3 px-10 bg-purple-500 text-white text-lg rounded-lg">
                        {isSignup ? "Sign Up" : "Sign In"}
                        <HiArrowRight style={{ fontSize: '20px', marginLeft: '10px' }} />
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
