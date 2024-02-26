import React from 'react'
import { useAuth } from '../../context/AuthContext'

const PanelAdmin = () => {
  const {user, logoutUser} = useAuth()

  return (
    <div>PanelAdmin
      <br />
      <button onClick={logoutUser} className='btn btn-danger py-2'>Cerrar Sesión</button>
    </div>

  )
}

export default PanelAdmin