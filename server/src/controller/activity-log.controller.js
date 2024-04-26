import prisma from "../db.js";

/**
 * Añade un token de dispositivo a un usuario en la base de datos.
 * @param {object} req El objeto de solicitud HTTP.
 * @param {object} res El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que resuelve con un mensaje de éxito o se rechaza con un error.
 */
export const addTokenToUser = async (req, res) => {
  try {
    // Obtiene el token y el ID de usuario de la solicitud
    const { token, userId } = req.body;

    // Busca al usuario en la base de datos
    const user = await prisma.USER.findUnique({
      where: {
        Id: userId,
      },
    });

    // Verifica si el usuario existe y actualiza el token de dispositivo del usuario
    if (user) {
      await prisma.USER.update({
        where: { Id: userId },
        data: { Device_Token: token },
      });

      // Envía una respuesta de éxito
      res
        .status(200)
        .json({ message: `Token added to user ${userId} successfully` });
    } else {
      // Si el usuario no se encuentra, envía un error 404
      res.status(404).json({ error: `User ${userId} not found` });
    }
  } catch (error) {
    console.error("Error adding token to user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Elimina un token de dispositivo de un usuario en la base de datos.
 * @param {object} req El objeto de solicitud HTTP.
 * @param {object} res El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que resuelve con un mensaje de éxito o se rechaza con un error.
 */
export const deleteTokenFromUser = async (req, res) => {
  try {
    // Obtiene el ID de usuario de la solicitud
    const { userId } = req.body;

    // Busca al usuario en la base de datos
    const user = await prisma.USER.findUnique({
      where: {
        Id: userId,
      },
    });

    // Verifica si el usuario existe y lo elimina
    if (user) {
      await prisma.USER.update({
        where: { Id: userId },
        data: { Device_Token: null },
      });

      // Envía una respuesta de éxito
      res
        .status(200)
        .json({ message: `Token deleted from user ${userId} successfully` });
    } else {
      // Si el usuario no se encuentra, envía un error 404
      res.status(404).json({ error: `User ${userId} not found` });
    }
  } catch (error) {
    console.error("Error deleting token from user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Obtiene todos los registros de actividad de la base de datos.
 * @param {object} req El objeto de solicitud HTTP.
 * @param {object} res El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que resuelve con los registros de actividad o se rechaza con un error.
 */
export const getActivityLogs = async (req, res) => {
  try {
    // Obtiene todos los registros de actividad de la base de datos
    const logs = await prisma.ACTIVITY_LOG.findMany();

    // Envía una respuesta exitosa con los registros de actividad
    res.status(200).json(logs);
  } catch (error) {
    
    // Registra cualquier error ocurrido
    console.error("Error fetching activity logs:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching activity logs" });
  }
};
