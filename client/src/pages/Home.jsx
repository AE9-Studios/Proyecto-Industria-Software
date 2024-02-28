import React from 'react'
import { useAuth } from '../context/AuthContext'
import NavBar from '../components/NavBar'

import Footer from '../components/Footer'
import LaddingPage from './LaddingPage'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className='bg-whia'>
      <NavBar />
      <LaddingPage />
      <Footer />

    </div>
  )
}

export default Home