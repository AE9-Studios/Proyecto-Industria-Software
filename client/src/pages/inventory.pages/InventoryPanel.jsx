import React from 'react'
import CardModules from '../../components/CardModules'

const InventoryPanel = () => {
  return (
    <div>
      <div className="col">
        <div className="row p-3">espacio para el menu</div>        <div className="row p-3 justify-content-center">
          <CardModules title="Movimientos de inventario" description="Observa el historial de entradas y salidas" icon={"bi bi-box-seam"} url="/admin/inventory/movement" />
          <CardModules title="Punto de reorden" description="Gestiona las ventas de tu negocio." icon={"bi bi-minecart-loaded"} url="inventory/reorder" />
          <CardModules title="Inventario valorado" description="Gestiona las ventas de tu negocio." icon={"bi bi-reception-4"} url="sales" />
          <CardModules title="Inventario a mano" description="Gestiona las ventas de tu negocio." icon={"bi bi-reception-2"} url="sales" />
          <CardModules title="Inventario" description="Gestiona las ventas de tu negocio." icon={"bi bi-cart-check"} url="inventory/view-inventory" />
        </div>
      </div>
    </div>
  )
}

export default InventoryPanel