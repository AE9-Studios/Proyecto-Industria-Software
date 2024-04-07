import prisma from "../db.js";
import { http500 } from "../libs/handleErrors.js";
import { sendEmailSupplier } from "../libs/sendEmail.js";

export const getProducts = async (req, res) => {
    try {
        const products = await prisma.PRODUCT.findMany({
            include: {
                Supplier: true,
                Category: true
            }
        });
        res.status(200).json(products);
    } catch (error) {
        http500(error, req, res);
    }
}

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await prisma.SUPPLIER.findMany();
        res.status(200).json(suppliers);
    } catch (error) {
        http500(error, req, res);
    }
}

export const getInventory = async (req, res) => {
    try {
        const inventory = await prisma.INVENTORY.findMany({
            include: {
                Product: {
                    select: {
                        Id: true, // Suponiendo que Id es el campo de identificación de tu producto
                        Name: true, // Otros campos que desees seleccionar
                        Description: true,
                        Price_Buy: true,
                        Price_Sell: true,
                        // Agrega otros campos de PRODUCT que desees seleccionar
                        Supplier: { // Incluimos el proveedor
                            select: {
                                Id: true,
                                Name: true,
                                // Otros campos del proveedor que desees seleccionar
                            }
                        }
                    }
                }

            }
        }
        );

        res.status(200).json(inventory);
    } catch (error) {
        http500(error, req, res);
    }
}


export const getCategory = async (req, res) => {
    try {
        const category = await prisma.CATEGORY.findMany();
        res.status(200).json(category);
    } catch (error) {
        http500(error, req, res);
    }
}

export const getPurchaseQuotations = async (req, res) => {
    try {
        const purchaseQuotations = await prisma.PURCHASE_QUOTATION.findMany(
            {
                include: {
                    Product: {
                        select: {
                            Id: true, // Suponiendo que Id es el campo de identificación de tu producto
                            Name: true, // Otros campos que desees seleccionar
                            Description: true,
                            // Agrega otros campos de PRODUCT que desees seleccionar
                            Supplier: { // Incluimos el proveedor
                                select: {
                                    Id: true,
                                    Name: true,
                                    // Otros campos del proveedor que desees seleccionar
                                }
                            }
                        }
                    }
                }
            }
        );
        res.status(200).json(purchaseQuotations);
    } catch (error) {
        http500(error, req, res);
    }
}


export const getInventoryMovements = async (req, res) => {
    try {
        const inventoryMovements = await prisma.INVENTORY_MOVEMENT.findMany({
            include: {
                Product: {
                    select: {
                        Id: true, // Suponiendo que Id es el campo de identificación de tu producto
                        Name: true, // Otros campos que desees seleccionar
                        Description: true,
                        // Agrega otros campos de PRODUCT que desees seleccionar
                        Supplier: { // Incluimos el proveedor
                            select: {
                                Id: true,
                                Name: true,
                                // Otros campos del proveedor que desees seleccionar
                            }
                        }
                    }

                }
            }
        });
        res.status(200).json(inventoryMovements);
    } catch (error) {
        http500(error, req, res);
    }
}

export const createCategory = async (req, res) => {
    try {
        const { Name, Description } = req.body;
        const category = await prisma.CATEGORY.create({
            data: {
                Name,
                description: Description
            }
        });
        res.status(200).json(category);
    } catch (error) {
        http500(error, req, res);
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { Id, Name, Description } = req.body;
        const category = await prisma.CATEGORY.update({
            where: { Id: parseInt(Id) },
            data: {
                Name,
                Description
            }
        });
        res.status(200).json(category);
    } catch (error) {
        http500(error, req, res);
    }
}

export const createSupplier = async (req, res) => {
    try {
        const { Name, Phone, Email, Address } = req.body;
        const supplier = await prisma.SUPPLIER.create({
            data: {
                Name,
                Phone,
                Email,
                Address
            }
        });
        sendEmailSupplier(supplier,
            "¡Se ha agregado como proveedor de Óptica Classic Vision!",
            `<p>Hola <strong>${supplier.Name}</strong>,</p>
            <p>Te damos la bienvenida a nuestra empresa.</p>
            <p>Se te ha añadido como proveedor en Classic Vision.</p>
            <p>Recibiras correos con peticiones de productos</p>
            <br>
            <p>¡Bienvenido!</p>
            <img src="cid:signature" alt="Classic Vision Logo" style="width:450px;height:auto;">
        `)
        res.status(200).json(supplier);
    } catch (error) {
        http500(error, req, res);
    }
}

export const createInventory = async (req, res) => {
    try {
        const { Product_Fk, Quantity, State, Description } = req.body;

        const product = await prisma.PRODUCT.findUnique({
            where: { Id: parseInt(Product_Fk) }
        });

        if (!product) {
            res.status(404).json(["Producto no encontrado"]);
            return;
        }
        const inventoryExist = await prisma.INVENTORY.findFirst({
            where: {
                Product_Fk
            }
        });
        if (inventoryExist) {
            updateInventory(req, res);
            return;
        }
        const inventory = await prisma.INVENTORY.create({
            data: {
                Product_Fk,
                Quantity,
                State,
                Description
            }
        });
        res.status(200).json(inventory);
    } catch (error) {
        http500(error, req, res);
    }
}

export const updateSupplier = async (req, res) => {
    try {
        const { Name, Description, Phone, Email, Address } = req.body;
        const supplier = await prisma.SUPPLIER.update({
            where: { Id: req.body.Id },
            data: {
                Name,
                Description,
                Phone,
                Email,
                Address
            }
        });
        sendEmailSupplier(supplier,
            "¡Actualización de información en Óptica Classic Vision!",
            "¡Se ha actualizado tu información en Óptica Classic Vision!",
            `<p>Hola <strong>${supplier.Name}</strong>,</p>
            <p>Se ha actualizado tu información en Classic Vision.</p>
            <p>Recibiras correos con peticiones de productos</p>
            <br>
            <p>¡Bienvenido!</p>
            <img src="cid:signature" alt="Classic Vision Logo" style="width:450px;height:auto;">
        `)
        res.status(200).json(supplier);
    } catch (error) {
        http500(error, req, res);
    }
}

export const createProduct = async (req, res) => {
    try {
        const { Name, Description, Brand, Price_Buy, Price_Sell, Supplier_Fk, Category_Fk } = req.body;
        const product = await prisma.PRODUCT.create({
            data: {
                Name,
                Description,
                Brand,
                Price_Buy,
                Price_Sell,
                Supplier_Fk,
                Category_Fk
            }
        });
        res.status(200).json(product);
    } catch (error) {
        http500(error, req, res);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { Name, Description, Brand, Price_Buy, Price_Sell, Supplier_Fk, Category_Fk } = req.body;
        const product = await prisma.PRODUCT.update({
            where: { Id: req.body.Id },
            data: {
                Name,
                Description,
                Brand,
                Price_Buy,
                Price_Sell,
                Supplier_Fk,
                Category_Fk
            }
        });
        res.status(200).json(product);
    } catch (error) {
        http500(error, req, res);
    }
}

export const createInventoryMovement = async (req, res) => {
    try {
        const { productId, State, Quantity, Description } = req.body;
        const inventoryMovement = await prisma.iNVENTORY_MOVEMENT.create({
            data: {
                Product_Fk: productId,
                Quantity,
                State,
                Description
            }
        });
        res.status(200).json(inventoryMovement);
    } catch (error) {
        http500(error, req, res);
    }
}

export const updateInventoryMovement = async (req, res) => {
    try {
        const { Id, productId, State, Quantity, Description } = req.body;
        const inventoryMovement = await prisma.INVENTORY_MOVEMENT.update({
            where: { Id: parseInt(Id) },
            data: {
                Product_Fk: productId,
                Quantity,
                State,
                Description
            }
        });
        res.status(200).json(inventoryMovement);
    } catch (error) {
        http500(error, req, res);
    }
}

export const updateInventory = async (req, res) => {
    try {
        const { Id, Product_Fk, Stock, Min_Stock, State, Description } = req.body;
        const inventory = await prisma.INVENTORY.update({
            where: { Id: parseInt(Id) },
            data: {
                Product_Fk,
                Stock,
                Min_Stock,
                State,
                Description
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
                        Supplier: true
                    }
                }
            }
        });
        console.log(inventory);
        if (inventory.Stock <= inventory.Min_Stock) {
            console.log("reordenando....");
            await sendEmailSupplier(inventory.Product.Supplier,
            "¡Se ha alcanzado el punto de reorden en Óptica Classic Vision!",
            `<p>Hola <strong>${inventory.Product.Supplier.Name}</strong>,</p>
            <p>Se ha alcanzado el punto de reorden en Classic Vision.</p>
            <p>Se solicita la entrega de ${inventory.Min_Stock} unidades nuevas de ${inventory.Product.Name}, ${inventory.Product.Brand}</p>
            <br>
            <p>¡Gracias!</p>
            <img src="cid:signature" alt="Classic Vision Logo" style="width:450px;height:auto;">
            `);
        }
        res.status(200).json(inventory);
    } catch (error) {
        http500(error, req, res);
    }
}


export const createPurchaseQuotation = async (req, res) => {
    try {
        const { Supplier_Fk, Product_Fk, Quantity, Price, Description } = req.body;
        const purchaseQuotation = await prisma.PURCHASE_QUOTATION.create({
            data: {
                Supplier_Fk,
                Product_Fk,
                Quantity,
                Price,
                Description
            }
        });
        res.status(200).json(purchaseQuotation);
    } catch (error) {
        http500(error, req, res);
    }
}

export const updatePurchaseQuotation = async (req, res) => {
    try {
        const { Id, Supplier_Fk, Product_Fk, Quantity, Price, Description } = req.body;
        const purchaseQuotation = await prisma.PURCHASE_QUOTATION.update({
            where: { Id: parseInt(Id) },
            data: {
                Supplier_Fk,
                Product_Fk,
                Quantity,
                Price,
                Description
            }
        });
        res.status(200).json(purchaseQuotation);
    } catch (error) {
        http500(error, req, res);
    }
}

export const deletePurchaseQuotation = async (req, res) => {
    try {
        const { Id } = req.body;
        await prisma.PURCHASE_QUOTATION.delete({
            where: { Id: parseInt(Id) }
        });
        res.status(200).json(["Se ha eliminado el registro con éxito"]);
    } catch (error) {
        http500(error, req, res);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { Id } = req.params;
        await prisma.PRODUCT.delete({
            where: { Id: parseInt(Id) }
        });
        res.status(200).json(["Se ha eliminado el registro con éxito"]);
    } catch (error) {
        http500(error, req, res);
    }
}

export const deleteSupplier = async (req, res) => {
    try {
        const { Id } = req.params;
        await prisma.SUPPLIER.delete({
            where: { Id: parseInt(Id) }
        });
        res.status(200).json(["Se ha eliminado el registro con éxito"]);
    } catch (error) {
        http500(error, req, res);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { Id } = req.params;
        await prisma.CATEGORY.delete({
            where: { Id: parseInt(Id) }
        });
        res.status(200).json(["Se ha eliminado el registro con éxito"]);
    } catch (error) {
        http500(error, req, res);
    }
}

export const deleteInventoryMovement = async (req, res) => {
    try {
        const { Id } = req.params;
        await prisma.INVENTORY_MOVEMENT.delete({
            where: { Id: parseInt(Id) }
        });
        res.status(200).json(["Se ha eliminado el registro con éxito"]);
    }
    catch (error) {
        http500(error, req, res);
    }
}

export const deleteInventory = async (req, res) => {
    try {
        const { Id } = req.params;
        await prisma.INVENTORY.delete({
            where: { Id: parseInt(Id) }
        });
        res.status(200).json(["Se ha eliminado el registro con éxito"]);
    } catch (error) {
        http500(error, req, res);
    }
}










