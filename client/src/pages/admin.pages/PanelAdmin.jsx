import React from 'react'
import { useAuth } from '../../context/AuthContext'
import CardModules from '../../components/CardModules'
import BottomNavigation from '../../components/BottomNavigation'

const PanelAdmin = () => {
  const { user, logoutUser } = useAuth()

  const list = [
    {
        title: 'Panel',
        url: '/admin/home',
        icon: 'bi bi-house-fill',
    },
    {
      title: "Bitácora",
      url: "/admin/logbook",
      icon: "bi bi-journal-bookmark-fill",
    },
]

  return (
    <div>
      <div className="container p-2 m-auto">
        <h3 className='text-center'>Panel de Administración</h3>
        <p className='p-2'>El administrador puede gestionar ventas, compras, inventario, recursos humanos, citas. Ademas de administrar los registros de los modelos en la Base de datos.
          <br />
          Seleccione una opción para dirigirse al panel correspondiente.
        </p>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="row p-3 justify-content-center">
          <CardModules title="Ventas" description="Gestiona las ventas de tu negocio." icon={"bi bi-cart"} url="sales" />
          <CardModules title="Compras" description="Administra las compras realizadas." icon="bi bi-credit-card" url="purchases" />
          <CardModules title="Inventario" description="Controla y supervisa el inventario disponible." icon="bi bi-archive" url="inventory" />
          <CardModules title="Citas" description="Organiza y gestiona citas y eventos." icon="bi bi-file-earmark-text" url="appointments" />
          <CardModules title="Recursos Humanos" description="Gestiona el personal y recursos humanos." icon="bi bi-people" url="human-resources" />
          <CardModules title="CRUD" description="Administra los registros de la Base de datos" icon="bi bi-database"
            url="https://classic-vision.alhanisespinal.tech/admin-crud/resources/USER" //para deploy
            // url="http://localhost:3000/admin-crud" //para dev
          />
        </div>
        <br />
      </div>
      <BottomNavigation list={list} />
    </div>

  )
}

export default PanelAdmin