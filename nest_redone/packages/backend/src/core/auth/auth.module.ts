import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '10s',
        algorithm: 'HS256',
      },
    }),
  ],

  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
