import * as client from 'amqplib';
import { Connection, Channel } from 'amqplib';
import { Queues } from '../rabbit/queues';
import { sendMail } from './send-mail';

async function start() {
  const connection: Connection = await client.connect(
    'amqp://username:password@localhost:5672'
  );

  const channel: Channel = await connection.createChannel();

  await channel.assertQueue(Queues.send_mail);

  await channel.consume(Queues.send_mail, (msg) => {
    console.log(123, msg.content.toString());
    sendMail(msg.content.toString()).catch(console.error);
    channel.ack(msg);
  });
}

start();
