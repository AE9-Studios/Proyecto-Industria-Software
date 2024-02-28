import React from 'react'
import { useAuth } from '../../context/AuthContext'
import NavBar from '../../components/NavBar'

const PanelAdmin = () => {
  const {user, logoutUser} = useAuth()

  return (
    <div>
      <NavBar/>
      PanelAdmin
      <br />
      <button onClick={logoutUser} className='btn btn-danger py-2'>Cerrar Sesión</button>
    </div>

  )
}

export default PanelAdmin