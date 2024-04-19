import prisma from "../db.js";
import fs from "fs";
import {
  sendNotification,
  sendNotificationToAdmin,
} from "../libs/sendNotification.js";
import { sendEmailSupplier } from "../libs/sendEmail.js";

export const savePurchaseOrder = async (req, res) => {
  const { items } = req.body;

  try {
    const groupedProducts = {};

    let totalOrder = 0;
    for (const item of items) {
      const { product, quantity } = item;
      const totalPrice = product.Price_Buy * quantity;
      totalOrder += totalPrice;

      if (!groupedProducts[product.Supplier.Id]) {
        groupedProducts[product.Supplier.Id] = {
          supplier: product.Supplier,
          items: [],
        };
      }
      groupedProducts[product.Supplier.Id].items.push({
        product: product,
        quantity: parseInt(quantity),
        totalPrice: totalPrice,
        description: product.Description,
      });
    }

    for (const supplierId in groupedProducts) {
      const supplierOrder = groupedProducts[supplierId];
      const purchaseOrder = await prisma.PURCHASE_ORDER.create({
        data: {
          Date: new Date(),
          State: "PENDIENTE",
          Total: supplierOrder.items.reduce(
            (acc, item) => acc + item.totalPrice,
            0
          ),
          Supplier: {
            connect: { Id: supplierOrder.supplier.Id },
          },
        },
      });

      for (const item of supplierOrder.items) {
        await prisma.PURCHASE_ORDER_DETAILED.create({
          data: {
            Date: new Date(),
            Quantity: item.quantity,
            Description: item.description,
            Product: {
              connect: { Id: item.product.Id },
            },
            Purchase_Order: {
              connect: { Id: purchaseOrder.Id },
            },
          },
        });
      }

      let emailMessage = `Hola ${supplierOrder.supplier.Name},<br><br>
        Aquí están los detalles de la orden de compra de los productos solicitados:<br><br>
        <strong>Total:</strong> ${purchaseOrder.Total} HNL<br><br>
        <strong>Productos:</strong><br><br>`;
      supplierOrder.items.forEach((item) => {
        emailMessage += `— ${item.product.Name} (${item.product.Description}) - Cantidad: ${item.quantity}<br>`;
      });
      emailMessage += `<br>¡Gracias por su servicio!`;

      await sendEmailSupplier(
        supplierOrder.supplier,
        "Detalles de la Orden de Compra",
        emailMessage
      );
    }

    res.status(200).json({
      message: "Órdenes de compra guardadas exitosamente.",
      totalOrder: totalOrder,
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
  const { id } = req.body;
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
          select: { Price_Sell: true },
        });

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
      })
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
  const { id } = req.body;

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

    let emailMessage = `Hola ${purchaseOrder.Supplier.Name},<br><br>
        La orden de compra ha sido rechazada.<br><br>
        Aquí están los detalles de los productos de la orden de compra rechazada:<br><br>`;
    purchaseOrder.PURCHASE_ORDER_DETAILED.forEach((item) => {
      emailMessage += `— ${item.Product.Name} (${item.Description}) - Cantidad: ${item.Quantity}<br>`;
    });
    emailMessage += `<br>Disculpe los incovenientes. Saludos.`;

    await sendEmailSupplier(
      purchaseOrder.Supplier,
      "Orden de Compra Rechazada",
      emailMessage
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

  try {
    if (
      !quotationItems ||
      !Array.isArray(quotationItems) ||
      !quotationItems.length
    ) {
      return res
        .status(400)
        .json({ error: "Elementos de cotización inválidos." });
    }

    const productsBySupplier = {};
    for (const item of quotationItems) {
      const supplierId = item.supplier.Id;
      if (!productsBySupplier[supplierId]) {
        productsBySupplier[supplierId] = {
          supplier: item.supplier,
          products: [],
        };
      }
      productsBySupplier[supplierId].products.push({
        productName: item.productName,
        quantity: item.quantity,
      });
    }

    for (const supplierId in productsBySupplier) {
      const { supplier, products } = productsBySupplier[supplierId];

      let emailMessage = `Hola ${supplier.Name},<br><br>
        Se solicita una cotización de los siguientes productos:<br><br>`;
      for (const product of products) {
        emailMessage += `Producto: ${product.productName}<br>`;
        emailMessage += `Cantidad: ${product.quantity}<br><br>`;
      }
      emailMessage += `<br>¡Esperamos su respuesta!`;

      await sendEmailSupplier(
        supplier,
        "Solicitud de Cotización",
        emailMessage
      );
    }

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
