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