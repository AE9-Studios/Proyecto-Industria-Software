import React from 'react'
import CardModules from '../../components/CardModules'

const InventoryPanel = () => {
  return (
    <div>
      <div className="col">
        <div className="row p-3">espacio para el menu</div>        <div className="row p-3 justify-content-center">
          <CardModules title="Movimientos de inventario" description="Observa el historial de entradas y salidas" icon={"bi bi-box-seam"} url="movement" />
          <CardModules title="Punto de reorden" description="Ve y Edita el punto de reorden para los productos" icon={"bi bi-minecart-loaded"} url="reorder" />
          <CardModules title="Inventario valorado" description="Información detallada sobre el valor del inventario" icon={"bi bi-reception-4"} url="inventory-valued" />
          <CardModules title="Inventario" description="Observa el inventario" icon={"bi bi-cart-check"} url="view-inventory" />
          <CardModules title="Inventario a mano" description="Haz el inventario" icon={"bi bi-reception-2"} url="inventory-to-hand" />
        </div>
      </div>
    </div>
  )
}

export default InventoryPanel