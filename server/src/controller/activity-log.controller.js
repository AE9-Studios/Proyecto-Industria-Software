import prisma from "../db.js";

/**
 * Registra una actividad en el log de la bitácora.
 * @param {string} name El nombre de la actividad.
 * @param {string} description La descripción de la actividad.
 * @returns {Promise<void>} Una promesa que resuelve después de registrar la actividad o se rechaza con un error.
 */
export const logActivity = async (name, description) => {
  try {
    const currentDate = new Date();

    await prisma.ACTIVITY_LOG.create({
      data: {
        name: name,
        Description: description,
        Date: currentDate,
      },
    });

    console.log(
      "\x1b[35m%s\x1b[0m",
      `LOG - name: ${name}, description: ${description}`
    );
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

export const addTokenToUser = async (req, res) => {
  try {
    const { token, userId } = req.body;

    const user = await prisma.USER.findUnique({
      where: {
        Id: userId,
      },
    });

    if (user) {
      await prisma.USER.update({
        where: { Id: userId },
        data: { Device_Token: token },
      });

      res
        .status(200)
        .json({ message: `Token added to user ${userId} successfully` });
    } else {
      res.status(404).json({ error: `User ${userId} not found` });
    }
  } catch (error) {
    console.error("Error adding token to user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTokenFromUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await prisma.USER.findUnique({
      where: {
        Id: userId,
      },
    });

    if (user) {
      await prisma.USER.update({
        where: { Id: userId },
        data: { Device_Token: null },
      });

      res
        .status(200)
        .json({ message: `Token deleted from user ${userId} successfully` });
    } else {
      res.status(404).json({ error: `User ${userId} not found` });
    }
  } catch (error) {
    console.error("Error deleting token from user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
