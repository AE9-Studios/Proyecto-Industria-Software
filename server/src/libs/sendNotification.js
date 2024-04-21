import admin from "firebase-admin";
import prisma from "../db.js";
import "dotenv/config";

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/**
 * Aún en fase de prueba (◞‸◟；)
 * Función para enviar una notificación push con un título y un mensaje a un usuario específico.
 * @param {string} title El título de la notificación.
 * @param {string} description La descripción o cuerpo del mensaje de la notificación.
 * @param {string} url La url relativa de a donde se rediccionará al presionar la notificación.
 * @param {string} token El token del dispositivo al que se enviará la notificación.
 * @returns {Promise<string>} Una promesa que resuelve con un mensaje de éxito o se rechaza con un error.
 */
export async function sendNotification(title, description, url, token) {
  try {
    const message = {
      token: token,
      notification: {
        title: title,
        body: description,
      },
      webpush: {
        fcm_options: {
          link: url,
        },
      },
    };

    const response = await admin.messaging().send(message);

    console.log("Notificación enviada exitosamente:", response);

    return response;
  } catch (error) {
    console.error("Error al enviar las notificaciones:", error);
  }
}

/**
 * Exclusiva para enviar notificaciones a los administradores. (Pendiente de revisión)
 * Función para enviar una notificación push con un título y un mensaje.
 * @param {string} title El título de la notificación.
 * @param {string} message El cuerpo del mensaje de la notificación.
 * @param {string} url La url relativa de a donde se rediccionará al presionar la notificación.
 * @returns {Promise<string>} Una promesa que resuelve con un mensaje de éxito o se rechaza con un error.
 */
export async function sendNotificationToAdmin(title, message, url) {
  try {
    const administrators = await prisma.USER.findMany({
      where: {
        Role: "ADMINISTRADOR",
      },
      select: {
        Device_Token: true,
      },
    });

    const messages = administrators.map((admin) => ({
      token: admin.Device_Token,
      notification: {
        title: title,
        body: message,
      },
      webpush: {
        fcm_options: {
          link: url,
        },
      },
    }));

    const responses = await Promise.all(
      messages.map((message) => admin.messaging().send(message))
    );

    console.log("Notificaciones enviadas exitosamente:", responses);

    return "Notificaciones enviadas exitosamente";
  } catch (error) {
    console.error("Error al enviar las notificaciones:", error);
  }
}
