import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Home from './pages/admin.pages/Home'
import Login from './pages/Login'
import Register from './pages/client.pages/Register'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import NotificationHandler from './components/NotificationHandler'
import Emulator from './components/Warning'
import { AccountRecovery, ResetPasswordPage } from './pages/PasswordRecovery'
import PanelAdmin from './pages/admin.pages/PanelAdmin'
import EmployeeHome from './pages/human-resources.pages/EmployeeHome'
import ClientHome from './pages/client.pages/ClientHome'
import ActivityLog from './pages/admin.pages/Log'

// modulo de inventario
import InventoryMovement from './pages/inventory.pages/InventoryMovement'
import InventoryPanel from './pages/inventory.pages/InventoryPanel'
import Inventory from './pages/inventory.pages/Inventory'
import Reorder from './pages/inventory.pages/Reorder'
import InventoryValued from './pages/inventory.pages/InventoryValued'
import InventoryToHand from './pages/inventory.pages/InventoryToHand'

{/** Módulo RRHH */ }
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

{/** Módulo Ventas */ }
import { Cart } from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ProductsProvider } from "./context/ShoppingCartContext";
import { ThankYouPage } from "./pages/client.pages/ThankYouPage";
import { ThankYouOrderPage } from "./pages/client.pages/ThankYouPage";
import SalesCatalogView from "./pages/sales.pages/SalesCatalogView";
import SalesPurchaseCheckout from "./pages/sales.pages/SalesPurchaseCheckout";
import SalesPurchaseList from "./pages/sales.pages/SalesPurchaseList";
import SalesOrderList from "./pages/sales.pages/SalesOrderList";
import SalesStatisticsPage from "./pages/sales.pages/SalesStatisticsPage";
import ClientAppointments from './pages/client.pages/ClientAppointments'
import Appointments from './pages/admin.pages/Appointments'
import AppointmentsEmployee from './pages/appointments.pages/AppointmentsEmployee'

{/** Módulo Compras */ }
import PurchasesPanel from './pages/purchases.pages/PurchasesPanel'
import PurchasesOrder from './pages/purchases.pages/PurchasesOrder'
import PurchasesQuotation from './pages/purchases.pages/PurchasesQuotation'
import PurchasesOrderList from './pages/purchases.pages/PurchasesOrderList'
import PurchasesOrderDetails from './pages/purchases.pages/PurchasesOrderDetails'
import PurchasesReceiptList from './pages/purchases.pages/PurchasesReceiptList'
import Serial from './Serial'
import { getSerial } from './api/auth'
import { useEffect, useState } from 'react'


function App() {

  const [serial, setSerial] = useState(false)

  const verifySerial = async () => {
    try {
      const res = await getSerial()
      console.log(res)
      setSerial(true)
    } catch (error) {
      error.response.data.map(e => console.log(e))
    }
  }

  useEffect(()=>{
    verifySerial()
  },[serial])


  return (
    <AuthProvider>
      <BrowserRouter>
        {
           serial ? <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<AccountRecovery />} />
            <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
            <Route path='/dontlookatme' element={<Emulator />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/admin/*' element={<AdminRoutes />} />
              <Route path='/client/*' element={<ClientRoutes />} />
              <Route path='/employee/*' element={<EmployeeRoutes />} />
            </Route>
          </Routes>
            :
            <Routes>
              <Route path='/' element={<Serial />} />
            </Routes>
        }
      </BrowserRouter>
    </AuthProvider>
  )
}

function AdminRoutes() {
  const { user } = useAuth()
  if (user.role !== 'ADMINISTRADOR') return <Navigate to='/' replace />

  return (
    <>
      <Routes>
        {user.role === 'ADMINISTRADOR' && <>

          {/* // aqui se agregan las rutas para el administrador */}
          <Route path='home' element={<PanelAdmin />} />
          <Route path='logbook' element={<ActivityLog />} />

          {/* modulo de citas  */}
          <Route path='/appointments' element={<Appointments />} />
          {/* Modulo inventario */}
          <Route path='inventory' element={<InventoryPanel />} />
          <Route path='inventory/movement' element={<InventoryMovement />} />
          <Route path='inventory/view-inventory' element={<Inventory />} />
          <Route path='inventory/reorder' element={<Reorder />} />
          <Route path='inventory/inventory-valued' element={<InventoryValued />} />
          <Route path='inventory/inventory-to-hand' element={<InventoryToHand />} />

          {/** Módulo RRHH */}
          <Route path='human-resources' element={<EmployeeHome />} />
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

          {/** Módulo Ventas */}
          <Route path="sales" element={<ClientHome />} />
          <Route path="/sales/new" element={<ProductsProvider><ShoppingCartProvider><SalesCatalogView /><Cart /></ShoppingCartProvider></ProductsProvider>} />
          <Route path="/sales/checkout" element={<ProductsProvider><ShoppingCartProvider><SalesPurchaseCheckout /><Cart /></ShoppingCartProvider></ProductsProvider>} />
          <Route path="/sales/list" element={<SalesPurchaseList />} />
          <Route path="/sales/stadistics" element={<SalesStatisticsPage />} />
          <Route path="/sales/order-list" element={<SalesOrderList />} />

          {/** Módulo Compras */}
          <Route path="purchases" element={<PurchasesPanel />} />
          <Route path="/purchases/new" element={<PurchasesOrder />} />
          <Route path="/purchases/quotation" element={<PurchasesQuotation />} />
          <Route path="/purchases/list" element={<PurchasesOrderList />} />
          <Route path="/purchases/list/:id" element={<PurchasesOrderDetails />} />
          <Route path="/purchases/receipts" element={<PurchasesReceiptList />} />
        </>}
      </Routes >
      <NotificationHandler />
    </>
  )
}

function ClientRoutes() {
  const { user } = useAuth()
  if (user.role !== 'CLIENTE') return <Navigate to='/' replace />
  return (
    <ProductsProvider>
      <ShoppingCartProvider>
        <NotificationHandler />
        <Routes>
          {user.role === 'CLIENTE' && <>
            // aqui se agregan las rutas para el cliente
            <Route path='home' element={<ClientHome />} />
            <Route path="/catalog" element={<><SalesCatalogView /><Cart /></>} />
            <Route path="/checkout" element={<><SalesPurchaseCheckout /><Cart /></>} />
            <Route path="/purchases" element={<SalesPurchaseList />} />
            <Route path="/orders" element={<SalesOrderList />} />
            <Route path="/thankyou" element={<ThankYouPage />} />
            <Route path="/thankyouorder" element={<ThankYouOrderPage />} />
            <Route path='/appointments' element={<ClientAppointments />} />
          </>}
        </Routes>
      </ShoppingCartProvider>
    </ProductsProvider>
  )
}

function EmployeeRoutes() {
  const { user } = useAuth()
  if (user.role !== 'EMPLEADO') return <Navigate to='/' replace />

  return (
    <>
      <Routes>
        {user.role === 'EMPLEADO' && <>
        // aqui se agregan las rutas para el empleado
          <Route path='home' element={<EmployeeHome />} />
          <Route path='permission' element={<EmployeePermissionCreate />} />
          <Route path='vacation' element={<EmployeeVacationCreate />} />
          <Route path='permission/:id' element={<EmployeePermissionDetails />} />
          <Route path='vacation/:id' element={<EmployeeVacationDetails />} />
          <Route path='requests' element={<EmployeeRequestList />} />
          {user.employeeData.Position === 'MEDICO' ? <Route path='/appointments' element={<AppointmentsEmployee />} /> : null}

        </>}
      </Routes>
      <NotificationHandler />
    </>
  )
}

export default App
