import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function sendMail(msg: string) {
  const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      service: 'Mail.ru',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

  await transporter.sendMail({
    from: '"Fred Foo 👻"',
    to: process.env.MAIL_RECEIVER,
    subject: 'Hello ✔',
    text: msg,
    html: '<b>Hello world?</b>',
  });
}
