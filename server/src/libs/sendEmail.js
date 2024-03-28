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

export const sendEmailSupplier = async (supplierData, subject, message ) => {
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
