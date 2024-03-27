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

{/** Módulo RRHH */}
import AdminCalendar from './pages/human-resources.pages/AdminCalendar'
import AdminEmployeeCreate from './pages/human-resources.pages/AdminEmployeeCreate'
import AdminEmployeeDetails from './pages/human-resources.pages/AdminEmployeeDetails'
import AdminEmployeeList from './pages/human-resources.pages/AdminEmployeeList'
import AdminPermissionDetails from './pages/human-resources.pages/AdminPermissionDetails'
import AdminRequestList from './pages/human-resources.pages/AdminRequestList'
import AdminScheduleCreate from './pages/human-resources.pages/AdminScheduleCreate'
import AdminScheduleList from './pages/human-resources.pages/AdminScheduleList'
import AdminScheduleDetails from './pages/human-resources.pages/AdminScheduleDetails'
import AdminVacationDetails from './pages/human-resources.pages/AdminVacationDetails'
import EmployeePermissionCreate from './pages/human-resources.pages/EmployeePermissionCreate'
import EmployeeRequestList from './pages/human-resources.pages/EmployeeRequestList'
import EmployeePermissionDetails from './pages/human-resources.pages/EmployeePermissionDetails'
import EmployeeVacationCreate from './pages/human-resources.pages/EmployeeVacationCreate'
import EmployeeVacationDetails from './pages/human-resources.pages/EmployeeVacationDetails'
import HHRRHome from './pages/human-resources.pages/HHRRHome'

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
        <Route path='human-resources' element={<HHRRHome />} />
        <Route path='human-resources/employees' element={<AdminEmployeeList />} />
        <Route path='human-resources/employees/:id' element={<AdminEmployeeDetails />} /> 
        <Route path='human-resources/permissions' element={<AdminRequestList />} /> 
        <Route path='human-resources/permissions/:id' element={<AdminPermissionDetails />} /> 
        <Route path='human-resources/vacations/:id' element={<AdminVacationDetails />} /> 
        <Route path='human-resources/create-employee' element={<AdminEmployeeCreate />} />
        <Route path='human-resources/create-schedule' element={<AdminScheduleCreate />} /> 
        <Route path='human-resources/schedules' element={<AdminScheduleList />} /> 
        <Route path='human-resources/schedules/:id' element={<AdminScheduleDetails />} /> 
        <Route path='human-resources/calendar' element={<AdminCalendar />} /> 

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
        <Route path='home' element={<HHRRHome />} />
        <Route path='permission' element={<EmployeePermissionCreate />} />
        <Route path='vacation' element={<EmployeeVacationCreate />} />
        <Route path='permission/:id' element={<EmployeePermissionDetails />} /> 
        <Route path='vacation/:id' element={<EmployeeVacationDetails />} />         
        <Route path='requests' element={<EmployeeRequestList />} />

      </>}
    </Routes>
  )
}

export default App
