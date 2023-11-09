import transport from "../services/nodemailer.service.js";
import env from "../config/enviroment.config.js";
export async function sendMails  (req, res) {
    const { remitente, asunto, mensaje  } = req.body;
    const mailOptions = {
      from: remitente, // Utiliza el correo del remitente ingresado por el usuario
      to: env.googleEmail, // Coloca tu dirección de correo electrónico aquí
      subject: asunto,
      text: `${mensaje}\n\nCorreo del remitente: ${remitente}`
    };
 transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Hubo un error al enviar el correo');
      } else {
        console.log('Correo enviado: ' + info.response);
        res.status(200).send('Correo enviado con éxito');
      }
    });
  };
  
