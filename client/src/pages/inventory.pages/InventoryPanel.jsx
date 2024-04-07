import React from 'react'
import CardModules from '../../components/CardModules'

const InventoryPanel = () => {
  return (
    <div>
      <div className="col">
        <div className="row p-3">espacio para el menu</div>        <div className="row p-3 justify-content-center">
          <CardModules title="Movimientos de inventario" description="Observa el historial de entradas y salidas" icon={"bi bi-box-seam"} url="/admin/inventory/movement" />
          <CardModules title="Punto de reorden" description="Ve y Edita el punto de reorden para los productos" icon={"bi bi-minecart-loaded"} url="/admin/inventory/reorder" />
          <CardModules title="Inventario a mano" description="Productos disponibles en almacen" icon={"bi bi-reception-2"} url="/admin/inventory/inventory-to-hand" />
          <CardModules title="Inventario valorado" description="Información detallada sobre el valor del inventario" icon={"bi bi-reception-4"} url="/admin/inventory/inventory-valued" />
          <CardModules title="Productos, Proveedores, Categorias" description="Observa y edita el inventario" icon={"bi bi-cart-check"} url="/admin/inventory/view-inventory" />
        </div>
      </div>
    </div>
  )
}

export default InventoryPanel