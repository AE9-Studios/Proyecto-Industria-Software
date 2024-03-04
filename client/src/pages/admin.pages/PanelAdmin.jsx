import React from 'react'
import { useAuth } from '../../context/AuthContext'
import CardModules from '../../components/CardModules'

const PanelAdmin = () => {
  const { user, logoutUser } = useAuth()

  return (
    <div>
      <div>Espacio para el menu</div>
      <div className="container d-flex justify-content-center">
        <div className="row p-3 justify-content-center">
          <CardModules title="Ventas" description="Gestiona las ventas de tu negocio." icon={"bi bi-cart"} url="sales" />
          <CardModules title="Compras" description="Administra las compras realizadas." icon="bi bi-credit-card" url="purchases" />
          <CardModules title="Inventario" description="Controla y supervisa el inventario disponible." icon="bi bi-archive" url="inventory" />
          <CardModules title="Citas" description="Organiza y gestiona citas y eventos." icon="bi bi-file-earmark-text" url="appointments" />
          <CardModules title="Recursos Humanos" description="Gestiona el personal y recursos humanos." icon="bi bi-people" url="human-resourses" />
        </div>
        <br />
      </div>
        <button onClick={logoutUser} className='btn btn-danger py-2'>Cerrar Sesión</button>
    </div>

  )
}

export default PanelAdmin