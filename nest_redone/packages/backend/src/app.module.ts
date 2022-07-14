import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigurationModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { AllowedModule } from './usecase/allowed-route/allowed-route.module';
import { RegistrationModule } from './usecase/registration/registration.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AllowedModule,
    RegistrationModule,
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
