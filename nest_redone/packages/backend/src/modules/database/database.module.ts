import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportEntity } from 'src/core/passports/passport.entity';
import { UserEntity } from '../../core/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_DATABASE,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      migrationsRun: true,
      migrations: [],
      entities: [UserEntity, PassportEntity],
      dropSchema: false,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
