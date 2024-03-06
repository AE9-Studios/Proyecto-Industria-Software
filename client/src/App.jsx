import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/client.pages/Register'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import PanelAdmin from './pages/admin.pages/PanelAdmin'
import ClientHome from './pages/client.pages/ClientHome'
import InventoryMovement from './pages/admin.pages/InventoryMovement'
import InventoryPanel from './pages/admin.pages/InventoryPanel'

import EmployeeHome from './pages/human-resources.pages/EmployeeHome'
import EmployeeList from './pages/human-resources.pages/EmployeeList'
import EmployeeCreate from './pages/human-resources.pages/EmployeeCreate'
import EmployeeDetails from './pages/human-resources.pages/EmployeeDetails'
import EmployeeRequest from './pages/human-resources.pages/EmployeeRequest'
import EmployeeSchedule from './pages/human-resources.pages/EmployeeSchedule'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='/client/*' element={<ClientRoutes />} />
            <Route path='/employee/*' element={<EmployeeRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function AdminRoutes() {
  const { user } = useAuth()
  if(user.role !== 'ADMINISTRADOR') return <Navigate to='/' replace/>

  return (
    <Routes>
      {user.role === 'ADMINISTRADOR' && <>
      // aqui se agregan las rutas para el administrador
        <Route path='home' element={<PanelAdmin />} />
        <Route path='inventory' element={<InventoryPanel />} />
        <Route path='inventory/movement' element={<InventoryMovement />} />

        {/** Módulo RRHH */}
        <Route path='human-resources' element={<EmployeeHome />} />
        <Route path='human-resources/employees' element={<EmployeeList />} />
        <Route path='human-resources/create-employee' element={<EmployeeCreate />} />
        <Route path='human-resources/employee/:id' element={<EmployeeDetails />} /> 
        <Route path='human-resources/create-schedule' element={<EmployeeSchedule />} /> 

      </>}
    </Routes>
  )
}

function ClientRoutes() {
  const {user} = useAuth()
  if(user.role !== 'CLIENTE') return <Navigate to='/' replace/>
  return (
    <Routes>
      {user.role === 'CLIENTE' && <>
      // aqui se agregan las rutas para el cliente
        <Route path='home' element={<ClientHome />} />
      </>}
    </Routes>
  )
}

function EmployeeRoutes() {
  const {user} = useAuth()
  if(user.role !== 'EMPLEADO') return <Navigate to='/' replace/>

  return (
    <Routes>
      {user.role === 'EMPLEADO' && <>
      // aqui se agregan las rutas para el empleado
        <Route path='home' element={<EmployeeHome />} />
        <Route path='request' element={<EmployeeRequest />} />
      </>}
    </Routes>
  )
}

export default App
