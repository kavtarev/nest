import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const options: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: 'backend_sockets',
    port: 3101
  }
}
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, options)

  app.listen()
}

bootstrap();
