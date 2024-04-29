import prisma from "../db.js";
import fs from "fs";
import {
  sendNotification,
  sendNotificationToAdmin,
} from "../libs/sendNotification.js";

import {
  sendEmailPurchaseSuccess,
  sendEmailOrderDone,
  sendEmailSupplier,
} from "../libs/sendEmail.js";

import { logActivity } from "../libs/logActivity.js";

export const saveInvoice = async (req, res) => {
  const {
    userId,
    employeeId,
    purchaseList,
    userName,
    email,
    subTotal,
    discount,
    ISV,
    payMethod,
    total,
  } = req.body;

  const parsedPurchaseList = JSON.parse(purchaseList);
  const { filename: invoiceFile } = req.file;

  try {
    let client_Fk = null;

    if (userId !== "null") {
      const user = await prisma.USER.findUnique({
        where: {
          Id: parseInt(userId),
        },
        include: {
          Client: true,
        },
      });

      if (!user) {
        res.status(404).json({
          error: "Cliente no encontrado para el userId proporcionado.",
        });
        return;
      }

      if (user.Client && user.Client.length > 0) {
        client_Fk = user.Client[0].Id;
      }

      sendEmailPurchaseSuccess({
        email: user.Email,
        user: user.User_Name,
        invoice: invoiceFile,
      });
    }
    let employee = null;

    if (employeeId !== "null") {
      employee = await prisma.EMPLOYEE.findFirst({
        select: {
          Id: true,
          User: {
            select: {
              User_Name: true,
            },
          },
        },
      });
    } else {
      employee = await prisma.EMPLOYEE.findFirst({
        where: {
          Position: "ADMINISTRATIVO",
        },
        select: {
          Id: true,
          User: {
            select: {
              User_Name: true,
            },
          },
        },
      });
    }

    const newInvoiceOrder = await prisma.INVOICE_ORDER.create({
      data: {
        Client_Fk: client_Fk,
        Employee_Fk: employee.Id,
        Date: new Date(),
        Invoice_File: invoiceFile,
        PayMethod: payMethod,
        Subtotal: parseFloat(subTotal),
        Discount: parseFloat(discount),
        ISV: parseFloat(ISV),
        Total: parseFloat(total),
      },
      include: {
        INVOICE_ORDER_PRODUCT_DETAILS: true,
      },
    });

    if (client_Fk === null && validateEmail(email) && userName) {
      await sendEmailPurchaseSuccess({
        email: email,
        user: userName,
        invoice: invoiceFile,
      });
    }

    if (newInvoiceOrder) {
      sendNotificationToAdmin(
        "¡Nueva compra!",
        `Se registró una compra de ${total} Lempiras`,
        "/admin/sales"
      );
      if (employeeId === "null") {
        await logActivity(
          "Compra en línea",
          `El cliente ${userName} realizó una compra en línea de ${total} Lempiras`
        );
      } else {
        await logActivity(
          "Compra en caja",
          `El administrador ${employee.User.User_Name} registró una compra en caja de ${total} Lempiras`
        );
      }

      await Promise.all(
        parsedPurchaseList.map(async (product) => {
          await logActivity(
            "Salida de inventario",
            `Se ha registado una cantidad saliente de ${product.quantity} del producto ${product.Name}`
          );

          const inventoryMovement = await prisma.iNVENTORY_MOVEMENT.create({
            data: {
              Product_Fk: product.Id,
              Quantity: product.quantity,
              State: "SALIDA",
              Description: `Se ha registado una cantidad saliente de ${product.quantity} del producto ${product.Name}`,
            },
          });

          const invoiceOrderProductDetail =
            await prisma.INVOICE_ORDER_PRODUCT_DETAILS.create({
              data: {
                Quantity: product.quantity,
                Product_Fk: product.Id,
                Description: product.Description,
                Invoice_Order_Fk: newInvoiceOrder.Id,
              },
              include: {
                Product: true,
              },
            });

          const inventory = await prisma.INVENTORY.findFirst({
            where: {
              Product_Fk: product.Id,
            },
            include: {
              Product: {
                select: {
                  Id: true, // Suponiendo que Id es el campo de identificación de tu producto
                  Name: true, // Otros campos que desees seleccionar
                  Description: true,
                  Brand: true,
                  Price_Buy: true,
                  Price_Sell: true,
                  // Agrega otros campos de PRODUCT que desees seleccionar
                  Supplier: true,
                },
              },
            },
          });

          if (inventory) {
            if (inventory.Stock <= inventory.Min_Stock) {
              console.log("reordenando....");
              await sendEmailSupplier(
                inventory.Product.Supplier,
                "¡Se ha alcanzado el punto de reorden en Óptica Classic Vision!",
                `<p>Hola <strong>${inventory.Product.Supplier.Name}</strong>,</p>
              <p>Se ha alcanzado el punto de reorden en Classic Vision.</p>
              <p>Se solicita la entrega de ${inventory.Min_Stock} unidades nuevas de ${inventory.Product.Name}, ${inventory.Product.Brand}</p>
              <br>
              <p>¡Gracias!</p>
              <img src="cid:signature" alt="Classic Vision Logo" style="width:450px;height:auto;">
              `
              );
            }

            const updatedStock = inventory.Stock - product.quantity;
            const updatedValuedInventory =
              updatedStock * invoiceOrderProductDetail.Product.Price_Sell;

            await prisma.INVENTORY.updateMany({
              where: {
                Product_Fk: product.Id,
              },
              data: {
                Stock: updatedStock,
                Valued_Inventory: updatedValuedInventory,
              },
            });
          }
        })
      );
    }

    res.status(200).json({ message: "Factura guardada correctamente." });
  } catch (error) {
    console.error("Error al guardar la factura:", error);

    res.status(500).json({
      error: "Error al guardar la factura y enviar el correo electrónico.",
    });
  }
};

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const getInvoiceOrdersByClientId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.USER.findUnique({
      where: {
        Id: parseInt(id),
      },
      include: {
        Client: true,
      },
    });

    if (!user) {
      res
        .status(404)
        .json({ error: "Cliente no encontrado para el userId proporcionado." });
      return;
    }

    const invoiceOrders = await prisma.INVOICE_ORDER.findMany({
      where: {
        Client_Fk: user.Client[0].Id,
      },
      include: {
        Client: true,
        Employee: true,
        INVOICE_ORDER_SERVICE_DETAILS: true,
        INVOICE_ORDER_PRODUCT_DETAILS: true,
      },
    });

    if (invoiceOrders.length === 0) {
      console.log("No se encontraron facturas para el cliente");
      res.status(200).json([]);
      return;
    }

    res.status(200).json({ invoiceOrders });
  } catch (error) {
    console.error("Error al obtener las facturas del cliente:", error);

    res
      .status(500)
      .json({ error: "Error al obtener las facturas del cliente." });
  }
};

export const getInvoiceAttachedFile = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await prisma.INVOICE_ORDER.findUnique({
      where: { Id: parseInt(id) },
      select: { Invoice_File: true },
    });

    if (!invoice) {
      return res.status(200).json("Invoice not found");
    }

    if (!invoice.Invoice_File) {
      return res.status(200).json("Invoice file not found");
    }

    const filePath = `src/assets/invoices/${invoice.Invoice_File}`;

    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      return res.status(404).json({ error: "Invoice file not found" });
    }
  } catch (error) {
    console.error("Error fetching invoice file:", error);
    res.status(500).json({
      error: "An error occurred while fetching invoice file",
    });
  }
};

export const getAllInvoiceOrders = async (req, res) => {
  try {
    const invoiceOrders = await prisma.INVOICE_ORDER.findMany({
      include: {
        Client: {
          include: {
            Person: true,
            User: true,
          },
        },
        Employee: {
          include: {
            Person: true,
          },
        },
        INVOICE_ORDER_SERVICE_DETAILS: true,
        INVOICE_ORDER_PRODUCT_DETAILS: {
          include: {
            Product: true,
          },
        },
      },
    });

    res.status(200).json({ invoiceOrders });
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error);

    res.status(500).json({ error: "Error al obtener todas las facturas." });
  }
};

export const getNextInvoiceIdAndCheckSeniority = async (req, res) => {
  try {
    const { id } = req.params;

    const getNextInvoiceId = async () => {
      const latestInvoice = await prisma.INVOICE_ORDER.findFirst({
        orderBy: { Id: "desc" },
        select: { Id: true },
      });

      return latestInvoice ? latestInvoice.Id + 1 : 1;
    };

    const isSeniorCitizen = async () => {
      if (!id) {
        return false;
      }

      const client = await prisma.CLIENT.findFirst({
        where: { User_Fk: parseInt(id) },
        select: { Person_Fk: true },
      });

      if (!client) {
        return false;
      }

      const person = await prisma.PERSON.findUnique({
        where: { Id: client.Person_Fk },
        select: { Birth_Date: true },
      });

      if (!person) {
        console.error("Person not found for client:", client);
        throw new Error("Person not found");
      }

      const birthDate = new Date(person.Birth_Date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 60;
    };

    const nextInvoiceId = await getNextInvoiceId();
    const isSenior = await isSeniorCitizen();

    res.status(200).json({ nextInvoiceId, isSenior });
  } catch (error) {
    console.error(
      "Error fetching invoice ID or checking senior citizen status:",
      error
    );
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

export const saveSaleOrder = async (req, res) => {
  const { userId, subTotal, discount, ISV, total } = req.body;
  const { filename: orderFile } = req.file;

  try {
    const user = await prisma.USER.findUnique({
      where: {
        Id: parseInt(userId),
      },
      include: {
        Client: true,
      },
    });

    if (!user || !user.Client || user.Client.length === 0) {
      res.status(404).json({
        error: "Cliente no encontrado para el userId proporcionado.",
      });
      return;
    }

    const client = user.Client[0];

    const employee = await prisma.EMPLOYEE.findFirst({
      where: {
        Position: "ADMINISTRATIVO",
      },
      select: {
        Id: true,
      },
    });

    if (!employee) {
      console.log(
        "No se encontró ningún empleado con la posición ADMINISTRATIVO."
      );
      res.status(404).json({
        error: "No se encontró ningún empleado con la posición ADMINISTRATIVO.",
      });
      return;
    }

    const newPurchaseOrder = await prisma.SALE_ORDER.create({
      data: {
        Client_Fk: client.Id,
        Employee_Fk: employee.Id,
        Date: new Date(),
        Order_File: orderFile,
        State: "PENDIENTE",
        Read: false,
        ReadClient: true,
        Subtotal: parseFloat(subTotal),
        Discount: parseFloat(discount),
        ISV: parseFloat(ISV),
        Total: parseFloat(total),
      },
    });

    res.status(200).json({
      message: "Orden de compra guardada exitosamente.",
    });
  } catch (error) {
    console.error("Error al guardar la orden de compra:", error);

    res.status(500).json({
      error: "Error al guardar la orden de compra.",
    });
  }
};

export const getPurchaseOrdersByClientId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.USER.findUnique({
      where: {
        Id: parseInt(id),
      },
      include: {
        Client: true,
      },
    });

    if (!user) {
      res
        .status(404)
        .json({ error: "Cliente no encontrado para el userId proporcionado." });
      return;
    }

    const purchaseOrders = await prisma.SALE_ORDER.findMany({
      where: {
        Client_Fk: user.Client[0].Id,
      },
      include: {
        Client: true,
      },
    });

    if (purchaseOrders.length === 0) {
      console.log("No se encontraron órdenes de compra para el cliente");
      res.status(200).json([]);
      return;
    }

    res.status(200).json({ purchaseOrders });
  } catch (error) {
    console.error("Error al obtener las órdenes de compra del cliente:", error);

    res
      .status(500)
      .json({ error: "Error al obtener las órdenes de compra del cliente." });
  }
};

export const getOrderAttachedFile = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.SALE_ORDER.findUnique({
      where: { Id: parseInt(id) },
      select: { Order_File: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (!order.Order_File) {
      return res.status(404).json({ error: "Order file not found" });
    }

    const filePath = `src/assets/orders/${order.Order_File}`;

    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      return res.status(404).json({ error: "Order file not found" });
    }
  } catch (error) {
    console.error("Error fetching order file:", error);
    res.status(500).json({
      error: "An error occurred while fetching order file",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const purchaseOrders = await prisma.SALE_ORDER.findMany({
      include: {
        Client: {
          include: {
            Person: true,
            User: true,
          },
        },
        Employee: {
          include: {
            Person: true,
          },
        },
      },
    });

    if (purchaseOrders.length === 0) {
      res.status(200).json("No orders found.");
      return;
    }

    res.status(200).json({ purchaseOrders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Error fetching all orders." });
  }
};

export const getPurchaseOrdersWithReadFalse = async (req, res) => {
  try {
    let purchaseOrders;

    if (req.params.flag === "ADMINISTRADOR") {
      purchaseOrders = await prisma.SALE_ORDER.findMany({
        where: {
          Read: false,
        },
      });
    } else if (req.params.flag === "CLIENTE") {
      const user = await prisma.USER.findUnique({
        where: {
          Id: parseInt(req.params.id),
        },
        include: {
          Client: true,
        },
      });

      if (!user || !user.Client || !user.Client[0]) {
        return res.status(404).json({ error: "Empleado no encontrado" });
      }

      const clientId = user.Client[0].Id;

      purchaseOrders = await prisma.SALE_ORDER.findMany({
        where: {
          ReadClient: false,
          Client_Fk: clientId,
        },
      });
    } else {
      return res.status(400).json({ error: "Parámetro flag no válido" });
    }

    const unreadPurchaseOrdersCount = purchaseOrders.length;

    res.status(200).json({
      unreadPurchaseOrdersCount,
    });
  } catch (error) {
    console.error("Error al obtener las órdenes de compra:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
};

export const updateReadClientToFalseById = async (req, res) => {
  const { id, flag } = req.params;

  try {
    let updatedItem;

    if (flag == "ADMINISTRADOR") {
      updatedItem = await prisma.SALE_ORDER.update({
        where: {
          Id: parseInt(id),
        },
        data: {
          Read: true,
        },
      });
    } else {
      updatedItem = await prisma.SALE_ORDER.update({
        where: {
          Id: parseInt(id),
        },
        data: {
          ReadClient: true,
        },
      });
    }

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({
      message: "ReadClient field updated successfully",
      updatedItem,
    });
  } catch (error) {
    console.error("Error updating ReadClient field:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating ReadClient field" });
  }
};

export const sendOrderReadyEmail = async (req, res) => {
  const { id } = req.params;

  try {
    const purchaseOrder = await prisma.SALE_ORDER.update({
      where: {
        Id: parseInt(id),
      },
      data: {
        State: "APROBADO",
        ReadClient: false,
      },
      select: {
        Order_File: true,
        Client: {
          select: {
            User: {
              select: {
                Email: true,
                User_Name: true,
                Device_Token: true,
              },
            },
          },
        },
      },
    });

    if (!purchaseOrder) {
      return res.status(404).json({
        error:
          "No se encontró ninguna orden de compra para el ID proporcionado.",
      });
    }

    const email = purchaseOrder.Client.User.Email;
    const user_Name = purchaseOrder.Client.User.User_Name;
    const orderFile = purchaseOrder.Order_File;

    await sendEmailOrderDone({
      email: email,
      user: user_Name,
      orderFile: orderFile,
    });

    sendNotification(
      "¡Su orden está lista!",
      "Ya puede venir por ella",
      "/client/orders",
      purchaseOrder.Client.User.Device_Token
    );

    await logActivity(
      "Orden de venta aprobada",
      `La orden del cliente ${user_Name}`
    );

    return res.status(200).json({
      message: "Correo electrónico enviado exitosamente y estado actualizado.",
    });
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico y actualizar el estado:",
      error
    );

    return res.status(500).json({
      error: "Error al enviar el correo electrónico y actualizar el estado.",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.PRODUCT.findMany({
      include: {
        Supplier: true,
        Category: true,
      },
    });

    const productsWithStock = await Promise.all(
      products.map(async (product) => {
        const inventory = await prisma.INVENTORY.findFirst({
          where: {
            Product_Fk: product.Id,
          },
          select: {
            Stock: true,
          },
        });
        return {
          ...product,
          Stock: inventory ? inventory.Stock : 0,
        };
      })
    );

    const productsWithAvailableStock = productsWithStock.filter(
      (product) => product.Stock > 0
    );

    res.status(200).json(productsWithAvailableStock);
  } catch (error) {
    http500(error, req, res);
  }
};
