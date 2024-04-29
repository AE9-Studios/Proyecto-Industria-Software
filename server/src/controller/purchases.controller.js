import prisma from "../db.js";
import fs from "fs";
import {
  sendNotification,
  sendNotificationToAdmin,
} from "../libs/sendNotification.js";
import { sendEmailPurchaseOrderData } from "../libs/sendEmail.js";
import { logActivity } from "../libs/logActivity.js";

export const savePurchaseOrder = async (req, res) => {
  try {
    const { purchaseList, total } = req.body;
    const attachment = req.file;

    const supplierName = JSON.parse(purchaseList)[0].Product.Supplier.Name;
    const supplierId = JSON.parse(purchaseList)[0].Product.Supplier.Id;

    const supplier = await prisma.SUPPLIER.findUnique({
      where: { Id: supplierId },
    });

    const purchaseOrder = await prisma.PURCHASE_ORDER.create({
      data: {
        Date: new Date(),
        State: "PENDIENTE",
        Total: parseFloat(total),
        Supplier: {
          connect: { Id: supplierId },
        },
      },
    });

    for (const item of JSON.parse(purchaseList)) {
      await prisma.PURCHASE_ORDER_DETAILED.create({
        data: {
          Date: new Date(),
          Quantity: parseInt(item.Quantity),
          Description: item.Product.Description,
          Product: {
            connect: { Id: item.Product.Id },
          },
          Purchase_Order: {
            connect: { Id: purchaseOrder.Id },
          },
        },
      });
    }

    const message = `<p>Hola <strong>${supplierName}</strong>,</p>
        <p><strong>Classic Vision</strong> solicita un nuevo pedido de producto.</p>
        <p>Adjunto encontrará la orden de compra detallada. Esperamos su pronta respuesta.</p>
        `;
    await sendEmailPurchaseOrderData(
      supplier,
      "Orden de Compra",
      message,
      attachment
    );

    await logActivity(
      "Nueva orden de compra",
      `Se ha enviado una orden de compra a ${supplierName}`
    );
    res.status(200).json({
      message: "Órdenes de compra guardadas exitosamente.",
    });
  } catch (error) {
    console.error("Error al guardar las órdenes de compra:", error);
    res.status(500).json({
      error: "Error al guardar las órdenes de compra.",
    });
  }
};

export const getAllPurchaseOrdersWithDetails = async (req, res) => {
  try {
    const purchaseOrders = await prisma.PURCHASE_ORDER.findMany({
      include: {
        PURCHASE_ORDER_DETAILED: {
          include: {
            Product: true,
          },
        },
        Supplier: true,
      },
    });

    res.status(200).json({
      message:
        "Lista de todas las órdenes de compra con detalles obtenida correctamente.",
      purchaseOrders: purchaseOrders,
    });
  } catch (error) {
    console.error(
      "Error al obtener la lista de todas las órdenes de compra con detalles:",
      error
    );
    res.status(500).json({
      error:
        "Error al obtener la lista de todas las órdenes de compra con detalles.",
    });
  }
};

export const getPurchaseOrderByIdWithDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const purchaseOrder = await prisma.PURCHASE_ORDER.findUnique({
      where: { Id: parseInt(id) },
      include: {
        PURCHASE_ORDER_DETAILED: {
          include: {
            Product: true,
          },
        },
        Supplier: true,
      },
    });

    if (!purchaseOrder) {
      return res.status(404).json({
        error: "No se encontró la orden de compra con el ID proporcionado.",
      });
    }

    res.status(200).json({
      message: "Orden de compra encontrada correctamente.",
      purchaseOrder: purchaseOrder,
    });
  } catch (error) {
    console.error("Error al obtener la orden de compra por ID:", error);
    res.status(500).json({
      error: "Error al obtener la orden de compra por ID.",
    });
  }
};

export const updatePurchaseOrderAndInventory = async (req, res) => {
  const { id, userName, minStock } = req.body;
  const { filename } = req.file;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se adjuntó ningún archivo." });
    }

    const updatedPurchaseOrder = await prisma.PURCHASE_ORDER.update({
      where: { Id: parseInt(id) },
      data: {
        State: "APROBADO",
        Invoice_File: filename,
      },
      include: {
        Supplier: true,
      },
    });

    if (!updatedPurchaseOrder) {
      return res.status(404).json({
        error:
          "No se pudo actualizar la orden de compra con el ID proporcionado.",
      });
    }

    const purchaseOrderDetails = await prisma.PURCHASE_ORDER_DETAILED.findMany({
      where: { Purchase_Order_Fk: parseInt(id) },
    });

    await Promise.all(
      purchaseOrderDetails.map(async (detail) => {
        const { Product_Fk, Quantity } = detail;

        const product = await prisma.PRODUCT.findUnique({
          where: { Id: Product_Fk },
          select: { Price_Sell: true, Name: true },
        });

        await logActivity(
          "Entrada a inventario",
          `Se ha registado una cantidad entrante de ${Quantity} del producto ${product.Name}`
        );

        const existingInventory = await prisma.INVENTORY.findFirst({
          where: { Product_Fk: Product_Fk },
        });

        if (!existingInventory) {
          await prisma.INVENTORY.create({
            data: {
              Product_Fk: Product_Fk,
              Stock: Quantity,
              Min_Stock: parseInt(minStock),
              Valued_Inventory: Quantity * product.Price_Sell,
            },
            
          });
        } else {
          await prisma.INVENTORY.updateMany({
            where: { Product_Fk: Product_Fk },
            data: {
              Stock: {
                increment: Quantity,
              },
              Valued_Inventory: {
                increment: Quantity * product.Price_Sell,
              },
            },
          });
        }
      })
    );

    const message = `<p>Hola <strong>${updatedPurchaseOrder.Supplier.Name}</strong>,</p>
      <p><strong>Classic Vision</strong> ha completado el pago de la orden de compra</p>
      <p>Adjunto encontrará la factura detallada.</p>
    `;

    await sendEmailPurchaseOrderData(
      updatedPurchaseOrder.Supplier,
      "Pago Realizado",
      message,
      req.file.filename
    );

    await logActivity(
      "Pago a proveedores",
      `El administrador ${userName} ha realizado un pago de ${updatedPurchaseOrder.Total} Lempiras al proveedor ${updatedPurchaseOrder.Supplier.Name}`
    );

    res.status(200).json({
      message: "Orden de compra actualizada correctamente y stock actualizado.",
    });
  } catch (error) {
    console.error(
      "Error al actualizar la orden de compra y el inventario:",
      error
    );
    res.status(500).json({
      error: "Error al actualizar la orden de compra y el inventario.",
    });
  }
};

export const rejectPurchaseOrder = async (req, res) => {
  const { purchaseList } = req.body;
  const attachment = req.file;

  const parsedPurchaseList =
    typeof purchaseList === "string" ? JSON.parse(purchaseList) : purchaseList;

  const id =
    purchaseList.length > 0 ? parsedPurchaseList[0].Purchase_Order_Fk : null;

  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de orden de compra inválido." });
    }

    const purchaseOrder = await prisma.PURCHASE_ORDER.findUnique({
      where: { Id: parseInt(id) },
      include: {
        Supplier: true,
        PURCHASE_ORDER_DETAILED: {
          include: { Product: true },
        },
      },
    });

    if (!purchaseOrder) {
      return res.status(404).json({
        error:
          "No se encontró ninguna orden de compra con el ID proporcionado.",
      });
    }

    const updatedPurchaseOrder = await prisma.PURCHASE_ORDER.update({
      where: { Id: parseInt(id) },
      data: {
        State: "RECHAZADO",
      },
    });

    if (!updatedPurchaseOrder) {
      return res.status(404).json({
        error:
          "No se pudo actualizar la orden de compra con el ID proporcionado.",
      });
    }

    const message = `<p>Hola <strong>${parsedPurchaseList[0].Product.Supplier.Name}</strong>,</p>
    <p><strong>Classic Vision</strong> <span style="color: red;">ha rechazado</span> la orden de compra.</p>
    <p>Adjunto encontrará la orden de compra detallada. Disculpe los incovenientes.</p>
    `;
    await sendEmailPurchaseOrderData(
      parsedPurchaseList[0].Product.Supplier,
      "Orden de Compra Rechazada",
      message,
      attachment
    );

    await logActivity(
      "Orden de compra rechazada",
      `Se ha rechazado una orden de compras a ${parsedPurchaseList[0].Product.Supplier.Name}`
    );

    res.status(200).json({
      message:
        "Orden de compra actualizada correctamente a estado RECHAZADO y correo electrónico enviado al proveedor.",
    });
  } catch (error) {
    console.error("Error al actualizar la orden de compra:", error);
    res.status(500).json({
      error: "Error al actualizar la orden de compra.",
    });
  }
};

export const requestQuotation = async (req, res) => {
  const { quotationItems } = req.body;

  const parsedquotationItems = JSON.parse(quotationItems);
  const attachment = req.file;

  const supplierName = parsedquotationItems[0].supplier.Name;
  try {
    const message = `<p>Hola <strong>${supplierName}</strong>,</p>
    <p><strong>Classic Vision</strong> ha solicitado una cotización de productos.</p>
    <p>Adjunto encontrará la cotización detallada. Esperamos su pronta respuesta.</p>
    `;

    await sendEmailPurchaseOrderData(
      parsedquotationItems[0].supplier,
      "Solicitud de Cotización",
      message,
      attachment
    );

    await logActivity(
      "Solicitud de cotización",
      `Se ha enviado una solicitud de cotización a ${supplierName}`
    );

    res.status(200).json({
      message:
        "Correos electrónicos de cotización enviados correctamente a los proveedores.",
    });
  } catch (error) {
    console.error("Error al enviar correos electrónicos de cotización:", error);
    res.status(500).json({
      error: "Error al enviar correos electrónicos de cotización.",
    });
  }
};

export const getOrderReceipt = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.PURCHASE_ORDER.findUnique({
      where: { Id: parseInt(id) },
      select: { Invoice_File: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (!order.Invoice_File) {
      return res.status(404).json({ error: "Receipt file not found" });
    }

    const filePath = `src/assets/receipts/${order.Invoice_File}`;

    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      return res.status(404).json({ error: "Receipt file not found" });
    }
  } catch (error) {
    console.error("Error fetching receipt file:", error);
    res.status(500).json({
      error: "An error occurred while fetching receipt file",
    });
  }
};

export const getApprovedPurchaseOrdersWithDetails = async (req, res) => {
  try {
    const approvedPurchaseOrders = await prisma.PURCHASE_ORDER.findMany({
      where: {
        State: "APROBADO",
      },
      include: {
        PURCHASE_ORDER_DETAILED: {
          include: {
            Product: true,
          },
        },
        Supplier: true,
      },
    });

    res.status(200).json({
      message:
        "Lista de todas las órdenes de compra aprobadas con detalles obtenida correctamente.",
      purchaseOrders: approvedPurchaseOrders,
    });
  } catch (error) {
    console.error(
      "Error al obtener la lista de todas las órdenes de compra aprobadas con detalles:",
      error
    );
    res.status(500).json({
      error:
        "Error al obtener la lista de todas las órdenes de compra aprobadas con detalles.",
    });
  }
};
