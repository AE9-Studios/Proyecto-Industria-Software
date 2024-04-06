import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Home from './pages/admin.pages/Home'
import Login from './pages/Login'
import Register from './pages/client.pages/Register'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import PanelAdmin from './pages/admin.pages/PanelAdmin'
import EmployeeHome from './pages/human-resources.pages/EmployeeHome'
import ClientHome from './pages/client.pages/ClientHome'

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

{/** Módulo Ventas */}
import { Cart } from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ProductsProvider } from "./context/ShoppingCartContext";
import { ThankYouPage } from "./pages/client.pages/ThankYouPage";
import { ThankYouOrderPage } from "./pages/client.pages/ThankYouPage";
import SalesCatalogView from "./pages/sales.pages/SalesCatalogView";
import SalesPurchaseCheckout from "./pages/sales.pages/SalesPurchaseCheckout";
import SalesPurchaseList from "./pages/sales.pages/SalesPurchaseList";
import PurchaseOrderList from "./pages/sales.pages/PurchaseOrderList";
import SalesStatisticsPage from "./pages/sales.pages/SalesStatisticsPage";





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
  if (user.role !== 'ADMINISTRADOR') return <Navigate to='/' replace />

  return (
    <Routes>
      {user.role === 'ADMINISTRADOR' && <>
        {/* // aqui se agregan las rutas para el administrador */}
        <Route path='home' element={<PanelAdmin />} />
        {/* Modulo inventario */}
        <Route path='inventory' element={<InventoryPanel />} />
        <Route path='inventory/movement' element={<InventoryMovement />} />
        <Route path='inventory/view-inventory' element={<Inventory />} />
        <Route path='inventory/reorder' element={<Reorder />} />
        <Route path='inventory/inventory-valued' element={<InventoryValued />} />
        <Route path='inventory/inventory-to-hand' element={<InventoryToHand />} />
        {/** Módulo RRHH */}
        <Route path='human-resources' element={<EmployeeHome/>} />
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
        <Route path="/sales/new" element={<ProductsProvider><ShoppingCartProvider><Cart role={user.role} /><SalesCatalogView /></ShoppingCartProvider></ProductsProvider>}/>
        <Route path="/sales/checkout" element={<ProductsProvider><ShoppingCartProvider><Cart role={user.role} /><SalesPurchaseCheckout /></ShoppingCartProvider></ProductsProvider>}/>
        <Route path="/sales/list" element={<SalesPurchaseList />} />
        <Route path="/sales/stadistics" element={<SalesStatisticsPage />} />
        <Route path="/sales/order-list" element={<PurchaseOrderList />} />

      </>}
    </Routes>
  )
}

function ClientRoutes() {
  const { user } = useAuth()
  if (user.role !== 'CLIENTE') return <Navigate to='/' replace />
  return (
    <ProductsProvider>
      <ShoppingCartProvider>
        <Cart/>
          <Routes>
            {user.role === 'CLIENTE' && <>
            // aqui se agregan las rutas para el cliente
            <Route path='home' element={<ClientHome />} />
            <Route path="/catalog" element={<SalesCatalogView />} />
            <Route path="/checkout" element={<SalesPurchaseCheckout />} />
            <Route path="/purchases" element={<SalesPurchaseList />} />
            <Route path="/orders" element={<PurchaseOrderList />} />
            <Route path="/thankyou" element={<ThankYouPage />} />
            <Route path="/thankyouorder" element={<ThankYouOrderPage />} />
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
    <Routes>
      {user.role === 'EMPLEADO' && <>
      // aqui se agregan las rutas para el empleado
        <Route path='home' element={<EmployeeHome/>} />
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
