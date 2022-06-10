import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login'

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const changeForm = () => {
        setIsSignup((change) => !change);
    };
    const handleSubmit = () => {

    };
    // const googleSuccess = async (res) => {console.log(res)}
    // const googleFailure = (err) => {
    //     console.log(err);
    //     console.log("Google Sign In was unsuccesfull. Please try again.")
    // }
    // const facebookSuccess = async (err, res) => {
    //     if(err){
    //         console.log(err);
    //         console.log("Facebook Sign In was unsuccesfull. Please try again.")
    //     }else{
    //         console.log(res);
    //     }
    // }

    return (
        <div className="flex h-screen">
            {/* LEFT SIDE WITH IMAGE */}
            <div 
                className="hidden w-1/2 bg-cover bg-center brightness-90 lg:flex"
                style={{ backgroundImage: isSignup ? "url('/assets/images/img3.jpg')": "url('/assets/images/img2.jpg')" }} 
            ></div> 
        

            {/* RIGHT SIDE WITH FORM */}
            <div className="block p-10 w-full max-w-2xl mx-auto sm:flex sm:flex-col sm:w-full">
                <h1 className="text-4xl font-bold">{isSignup ? "Sign Up" : "Sign In"}</h1>
                <div className="flex items-center mt-3">
                    <div className="h-0.5 w-20 mr-6 bg-purple-500 rounded-sm"></div>
                    <h2 className="font-semibold text-purple-500 text-base">{isSignup ? "Sign Up" : "Sign In"}</h2>
                </div>
                <div className="block items-center mt-7 sm:flex">
                    
                    {/* <GoogleLogin 
                        clientId={REACT_APP_GOOGLE_CLIENT_ID}
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="text-xs flex items-center py-2 px-4 my-4 border-2 border-gray-400 rounded-2xl mr-8 sm:text-base">
                                <FcGoogle style={{ fontSize: '25px', marginRight: '10px' }} />
                                {isSignup ? "Sign Up" : "Sign In"} with Google
                            </button>
                        )}
                        buttonText="Sign In with Google"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />

                    <FacebookLogin 
                        clientId={REACT_APP_FACEBOOK_CLIENT_ID}
                        autoLoad
                        callback={facebookSuccess}
                        cssClass="text-xs flex items-center py-2 px-4 my-4 border-2 border-gray-400 rounded-2xl mr-8 sm:text-base"
                        icon={<SiFacebook style={{ fontSize: '25px', marginRight: '10px', color: '#039BE5' }} />}
                        textButton={isSignup ? "Sign Up with Facebook" : "Sign In with Facebook"}
                    /> */}
                    <button className="text-xs flex items-center py-2 px-4 my-4 border-2 border-gray-400 rounded-2xl mr-8 sm:text-base">
                                <FcGoogle style={{ fontSize: '25px', marginRight: '10px' }} />
                                {isSignup ? "Sign Up" : "Sign In"} with Google
                    </button>    
                    <button className="text-xs flex items-center py-2 px-4 my-4 border-2 border-gray-400 rounded-2xl mr-8 sm:text-base">
                                <SiFacebook style={{ fontSize: '25px', marginRight: '10px' }} />
                                {isSignup ? "Sign Up" : "Sign In"} with Facebook
                    </button> 
                    
                </div>

                <div className="flex items-center mt-10">
                    <div className="h-0.5 w-20 mr-6 bg-purple-500 rounded-sm"></div>
                    <h2 className="font-semibold text-purple-500 text-base">Or</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col justify-center">
                    {
                        isSignup ?
                        <div className="mb-10 flex-col items-center justify-around sm:flex-row">
                            <div className="w-full mr-0 mb-10 sm:mr-10">
                                <label className="block text-base font-semibold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" type="text" placeholder="UserName" />
                            </div>
                            <div className="w-full">
                                <label className="block text-base font-semibold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" type="email" placeholder="Email" />
                            </div>
                        </div>
                        :
                        <div className="mb-10">
                            <label className="block text-base font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" type="email" placeholder="Email" />
                        </div>
                    }
                    <div className="mb-14">
                        <label className="block text-base font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="rounded-lg bg-gray-300 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-2 border-purple-500" type="password" placeholder="Password" />
                    </div>
                    
                    <button className="flex items-center justify-center py-3 px-10 bg-purple-500 text-white text-lg rounded-lg">
                        {isSignup ? "Sign Up" : "Sign In"}
                        <HiArrowRight style={{ fontSize: '20px', marginLeft: '10px' }} />
                    </button>
                    <Link to="/auth" onClick={changeForm} className="flex mt-6 items-center justify-center py-3 px-10 bg-black text-white text-lg rounded-lg">
                        {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Auth
