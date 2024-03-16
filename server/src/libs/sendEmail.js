import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "opticaclassicvision@gmail.com",
    pass: "yrkz fzvi vssd bufe",
  },
});

export const sendEmailEmployeeCreated = async (employeeData) => {
  try {
    const mailOptions = {
      from: "softwareengineeringtestproject@gmail.com",
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
          filename: "logo-horizontal.jpg",
          path: path.join(__dirname, "../assets/logo-horizontal.jpg"),
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
