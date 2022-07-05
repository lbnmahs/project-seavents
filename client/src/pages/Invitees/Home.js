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
        <section>
            <nav className="flex justify-around items-center">
            <Link to="/" className="font-bold italic text-blue-500 text-xl p-6">Sea<span className="text-purple-500">vents</span></Link>
            <h1 className="text-xl font-bold">{getGreeting()}</h1>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </nav>
        </section>
    );
}

export default Home;