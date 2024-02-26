import React from 'react'
import { useAuth } from '../../context/AuthContext'

const EmployeeHome = () => {
  const {user, logoutUser} = useAuth()


  return (
    <div>EmployeeHome
      <br />
      <button onClick={logoutUser} className='btn btn-danger py-2'>Cerrar Sesión</button>
    </div>

  )
}

export default EmployeeHome