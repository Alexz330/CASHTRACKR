import { transport } from "../config/nodemailer";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "CashTrackr <alexis@cashtrackr.com>",
      to: user.email,
      subject: "Confirmacion de cuenta",
      html: `<p>Hola ${user.name}, has creado una cuenta en CashTrackr</p>
             <p>Visita el siguiente enlace:</p>
             <a href="#}">Confirmar cuenta</a>
           <p> e ingres el codigo de confirmacion: ${user.token}</p>
           <p>Gracias por usar CashTrackr</p>
                 `,
    });
  };
}
