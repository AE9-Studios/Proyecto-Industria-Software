import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const {user} = useAuth()

  return (
    <div className='container'>
      <h2>Pagina de inicio</h2>
      <a href="/login">Iniciar sesion</a>
      <br />
      <a href="/register">Registrarse</a>

    </div>
  )
}

export default Home