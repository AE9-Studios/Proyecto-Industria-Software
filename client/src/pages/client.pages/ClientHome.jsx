import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ClientHome = () => {
  const { user, logoutUser } = useAuth()

  return (
    <div>ClientHome
      <br />
      <button onClick={logoutUser} className='btn btn-danger py-2'>Cerrar Sesión</button>
    </div>
  )
}

export default ClientHome