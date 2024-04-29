import React from 'react'
import CardModules from '../../components/CardModules'
import BottomNavigation from '../../components/BottomNavigation'

const InventoryPanel = () => {
  const list = [
    {
      title: 'Volver',
      url: '/admin/home',
      icon: 'bi bi-arrow-left-circle-fill',
    },
    {
      title: 'Panel',
      url: '/admin/home',
      icon: 'bi bi-house-fill',
    },
  ]
  return (
    <div>
      <div className="container p-2 m-auto">
        <h3 className='text-center'>Panel de Inventario</h3>
        <p className='text-center p-2'>Gestiona el inventario de productos de la empresa.
          <br />
          Seleccione una opción para dirigirse al panel correspondiente.
        </p>
      </div>
      <div className="col">
        <div className="row p-3 justify-content-center">
          <CardModules title="Movimientos de inventario" description="Observa el historial de entradas y salidas" icon={"bi bi-box-seam"} url="/admin/inventory/movement" />
          <CardModules title="Punto de reorden" description="Ve y Edita el punto de reorden para los productos" icon={"bi bi-minecart-loaded"} url="/admin/inventory/reorder" />
          <CardModules title="Inventario a mano" description="Productos disponibles en almacen" icon={"bi bi-reception-2"} url="/admin/inventory/inventory-to-hand" />
          <CardModules title="Inventario valorado" description="Información detallada sobre el valor del inventario" icon={"bi bi-reception-4"} url="/admin/inventory/inventory-valued" />
          <CardModules title="Productos, Proveedores, Categorias" description="Observa y edita el inventario" icon={"bi bi-cart-check"} url="/admin/inventory/view-inventory" />
        </div>
      </div>
      <BottomNavigation list={list} />
    </div>
  )
}

export default InventoryPanel