import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/client.pages/Register'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import PanelAdmin from './pages/admin.pages/PanelAdmin'
import ClientHome from './pages/client.pages/ClientHome'
import EmployeeHome from './pages/human-resourses.pages/EmployeeHome'

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
      </>}
    </Routes>
  )
}

export default App
