import * as client from 'amqplib';
import { Connection, Channel } from 'amqplib';

async function start() {
  const connection: Connection = await client.connect(
    'amqp://username:password@localhost:5672'
  );

  const channel: Channel = await connection.createChannel();

  await channel.assertQueue('myQueue');

  await channel.consume('myQueue', (msg) => {
    console.log(123, msg.content.toString());
    channel.ack(msg);
  });
}

start();
