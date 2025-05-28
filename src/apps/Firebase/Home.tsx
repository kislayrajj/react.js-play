import React from 'react'
import { useAuth } from '../../context/authContext'

const Home: React.FC = () => {
    const { currentUser } = useAuth()

    return (
        <div className="text-2xl font-bold pt-14 text-gray-50">
            Hello {currentUser?.displayName ?? currentUser?.email}, you are now logged in.
        </div>
    )
}

export default Home
