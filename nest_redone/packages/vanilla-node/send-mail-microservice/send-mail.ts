import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function sendMail(msg: string) {
  const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      service: 'Mail.ru',
      auth: {
        
      },
    });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Fred Foo 👻"', // sender address
    to: '', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: msg, // plain text body
    html: '<b>Hello world?</b>', // html body
  });
}
