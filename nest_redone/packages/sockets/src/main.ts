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
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, { transport: Transport.TCP, options: {
    port: 3101,
    host: '0.0.0.0'
  } })

  await app.listen()
  
}

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)

//   app.listen(3100)
// }

bootstrap();
