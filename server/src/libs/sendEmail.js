import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "opticaclassicvision@gmail.com",
    pass: "dpyw heyg extw fwtc",
  },
});

export const sendEmailEmployeeCreated = async (employeeData) => {
  try {
    const mailOptions = {
      from: '"Óptica Classic Vision" <opticaclassicvision@gmail.com>',
      to: employeeData.email,
      subject: "¡Bienvenido!",
      html: `
                <p>Hola <strong>${employeeData.firstName} ${employeeData.lastName}</strong>,</p>
                <p>Te damos la bienvenida a nuestra empresa.</p>
                <p>Tu cuenta ha sido creada con éxito como empleado en Classic Vision.</p>
                <p>A continuación encontrarás las credenciales para ingresar a tu cuenta:</p>
                <ul>
                    <li>Correo electrónico: ${employeeData.institutionalEmail}</li>
                    <li>Contraseña: ${employeeData.password}</li>
                </ul>
                <br>
                <p><strong>Recomendamos que hagas un cambio de contraseña inmediatamente.</strong></p>
                <br>
                <p>¡Bienvenido!</p>
                <img src="cid:signature" alt="Classic Vision Logo" style="width:450px;height:auto;">
            `,
      attachments: [
        {
          filename: "signature.jpg",
          path: path.join(__dirname, "../assets/signature.jpg"),
          cid: "signature",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Correo enviado a ${employeeData.email} para notificar la creación de cuenta.`
    );
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de notificación de creación de cuenta de empleado:",
      error
    );
    throw error;
  }
};

export const sendEmailSupplier = async (supplierData, subject, message) => {
  try {
    const mailOptions = {
      from: '"Óptica Classic Vision" <opticaclassicvision@gmail.com>',
      to: supplierData.Email,
      subject: subject,
      html: message,
      attachments: [
        {
          filename: "signature.jpg",
          path: path.join(__dirname, "../assets/signature.jpg"),
          cid: "signature",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Correo enviado a ${supplierData.Email}`
    );
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico al proveedor:",
      error
    );
    throw error;
  }
};

export const sendEmailPurchaseSuccess = async (customerData) => {
  try {
    const mailOptions = {
      from: '"Óptica Classic Vision" <opticaclassicvision@gmail.com>',
      to: customerData.email,
      subject: "¡Gracias por tu compra!",
      html: `
        <p>¡Hola <strong>${customerData.user}</strong>!</p>
        <p>Gracias por confiar en nosotros para tu compra en Classic Vision.</p>
        <p>Adjunto encontrarás la factura correspondiente a tu compra.</p>
        <br>
        <p><strong>Esperamos que disfrutes de tus productos. ¡Gracias por tu preferencia! </strong></p>
        <img src="cid:signature" alt="Classic Vision Logo" style="width:450px;height:auto;">
      `,
      attachments: [
        {
          filename: "signature.jpg",
          path: path.join(__dirname, "../assets/signature.jpg"),
          cid: "signature",
        },
        {
          filename: `invoice_${customerData.invoice}.pdf`,
          path: path.join(
            __dirname,
            `../assets/invoices/${customerData.invoice}`
          ),
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Correo enviado a ${customerData.email} para agradecer por la compra.`
    );
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de agradecimiento por la compra:",
      error
    );
    throw error;
  }
};

export const sendEmailOrderDone = async (customerData) => {
  try {
    const mailOptions = {
      from: '"Óptica Classic Vision" <opticaclassicvision@gmail.com>',
      to: customerData.email,
      subject: "¡Tu orden de compra está lista!",
      html: `
      <p>¡Hola <strong>${customerData.user}</strong>!</p>
      <p>¡Tenemos buenas noticias para ti! Tus productos están listos y te esperan en nuestra tienda.</p>
      <p>¡No esperes más para venir a adquirirlos!</p>      
      <br>
      <p><strong>¡Gracias por tu preferencia y esperamos verte pronto en Classic Vision!</strong></p>
      <img src="cid:signature" alt="Classic Vision Logo" style="width:450px;height:auto;">
      `,
      attachments: [
        {
          filename: "signature.jpg",
          path: path.join(__dirname, "../assets/signature.jpg"),
          cid: "signature",
        },
        {
          filename: `invoice_${customerData.orderFile}.pdf`,
          path: path.join(
            __dirname,
            `../assets/orders/${customerData.orderFile}`
          ),
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Correo enviado a ${customerData.email} para notificar que su orden está lista.`
    );
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de agradecimiento por la compra:",
      error
    );
    throw error;
  }
};

export const sendEmailRecoveryPassword = async (
  userData,
  name,
  url,
  expire
) => {
  try {
    const mailOptions = {
      from: '"Óptica Classic Vision" <opticaclassicvision@gmail.com>',
      to: userData.Email,
      subject: "Solicitud de cambio de contraseña",
      html: `
      <p>Hola <strong>${name}</strong>,</p>
      <p>Se ha solicitado un restablecimiento de contraseña.</p>
      <p>Por favor, ingrese al siguiente enlace para proceder con el restablecimiento de su contraseña: <br> <a href="${url}" >Haga clic aquí.</a></p>
      <br>
      <p>Este enlace expirará en <strong> ${expire} minutos </strong>. Por su seguridad, le recomendamos no compartir este enlace con terceros.</p>
      <img src="cid:signature" alt="Classic Vision Logo" style="width:450px;height:auto;">
      `,
      attachments: [
        {
          filename: "signature.jpg",
          path: path.join(__dirname, "../assets/signature.jpg"),
          cid: "signature",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Correo enviado a ${userData.Email} para notificar el cambio de contraseña.`
    );
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de notificación de cambio de contraseña:",
      error
    );
    throw error;
  }
};