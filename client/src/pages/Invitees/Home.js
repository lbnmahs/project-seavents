import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddEvent from '../../components/inviters/AddEvent'
import ViewEvent from '../../components/inviters/ViewEvents'
import jwt from 'jsonwebtoken'

const Home = () => {
    const [userName, setUserName] = useState('');
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
    const showInviterDetails = async() => {
        const request = await fetch('http://localhost:5000/api/:id/events', {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        })
        const data = await request.json()
        console.log(data)
        if(data.status === 'ok'){
            setUserName(data.inviter.userName)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const inviter =  jwt.decode(token)
            if(!inviter){
                logout()
            }else{
                showInviterDetails()
            }
        }
    }, [])
    return (
        <section className="h-screen bg-cover bg-center bg-gray-100">
            <nav className="flex justify-around items-center bg-white mx-auto">
                <Link to="/" className="font-bold italic text-blue-500 text-xl p-6">Sea<span className="text-purple-500">vents</span></Link>
                <h1 className="text-3xl font-base">{getGreeting()}, {userName}</h1>
                <button onClick={logout} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-3xl">Logout</button>
            </nav>
            <AddEvent />
            <ViewEvent />
        </section>
    );
}

export default Home;