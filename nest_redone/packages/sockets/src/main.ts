import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// const options: MicroserviceOptions = {
//   transport: Transport.RMQ,
//   options: {
//     urls: ['amqp://rabbitmq:5672'],
//     queue: 'main',
//     queueOptions: {
//       durable: false
//     },
//     noAck: false
//   },
// }
// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(AppModule, options)

//   app.listen()
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.listen(3100)
}

bootstrap();
