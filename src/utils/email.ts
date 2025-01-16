// import nodemailer, { Transporter } from 'nodemailer';
// import pug from 'pug';
// import { convert } from 'html-to-text';



// class Email {
//   private to: string;
//   private firstName: string;
//   private url: string;
//   private from: string;

//   constructor(user: any, url: string) {
//     this.to = user.email;
//     this.firstName = user.firstName;
//     this.url = url;
//     this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;
//   }

//   private newTransport(): Transporter {
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       auth: {
//         user: process.env.SENDGRID_USERNAME,
//         pass: process.env.SENDGRID_PASSWORD
//       }
//     });
//   }


//   // Send the actual email
//   private async send(template: string, subject: string): Promise<void> {
//     // 1) Render HTML based on a pug template
//     const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//       firstName: this.firstName,
//       url: this.url,
//       subject,
//     });

//     // 2) Define email options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: convert(html),
//     };

//     // 3) Create a transport and send email
//     await this.newTransport().sendMail(mailOptions);
//   }

//   public async sendWelcome(): Promise<void> {
//     await this.send('welcome', 'Welcome to the Natours Family!');
//   }

//   public async sendPasswordReset(): Promise<void> {
//     await this.send(
//       'passwordReset',
//       'Your password reset token (valid for only 10 minutes)'
//     );
//   }
// }

// export default Email;
