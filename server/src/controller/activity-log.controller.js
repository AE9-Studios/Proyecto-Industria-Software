import prisma from "../db.js";

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

export const getActivityLogs = async (req, res) => {
  try {
    const logs = await prisma.ACTIVITY_LOG.findMany();
    res.status(200).json( logs ); // Devuelve los registros como respuesta JSON
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    res.status(500).json({ success: false, error: "Error fetching activity logs" }); // Devuelve un error si hay un problema
  }
};