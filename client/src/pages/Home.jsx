import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const {user} = useAuth()

  console.log(user)
  return (
    <div>Home</div>
  )
}

export default Home