import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const logout = () => {
        localStorage.removeItem('token')
        window.location.replace("/inviters/auth")
    }

    const getGreeting = () => {
        const time = new Date().getHours()
        if (time >= 0 && time < 12) {
            return 'Good Morning'
        } else if (time >= 12 && time < 18) {
            return 'Good Afternoon'
        } else if (time >= 18 && time < 24) {
            return 'Good Evening'
        }
    }

    return (
        <section className="h-screen bg-cover bg-center bg-gray-100">
            <nav className="flex justify-around items-center bg-white mx-auto">
                <Link to="/" className="font-bold italic text-blue-500 text-xl p-6">Sea<span className="text-purple-500">vents</span></Link>
                <h1 className="text-3xl font-base">{getGreeting()}, </h1>
                <button onClick={logout} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-3xl">Logout</button>
            </nav>
            <div className="flex  flex-col justify-center items-center bg-white mt-5 max-w-7xl mx-auto rounded-3xl p-10">
                <h1 className="text-6xl mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Welcome to SeaVents</h1>
                <p className="text-xl font-semibold text-gray-700">Click the + sign below to create an event</p>
                <button className="text-6xl rounded-xl border border-black flex justify-center items center py-10 px-20 mt-5 border-dashed border-3">+</button>
            </div>
            <div className="flex  flex-col justify-center items-center bg-white mt-5 max-w-7xl mx-auto rounded-3xl p-10">
                <p className="text-xl font-semibold text-gray-700">You do not have an event planned</p>
            </div>
            
        </section>
    );
}

export default Home;