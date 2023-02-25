import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportEntity } from 'src/core/passports/passport.entity';
import { TokenEntity } from 'src/core/token/token.entity';
import { init1677227825954 } from 'src/modules/database/migrations/1677227825954-init';
import { UserEntity } from '../../core/user/user.entity';
import { addDate1677228276963 } from './migrations/1677228276963-addDate';
import { addNullable1677237343450 } from './migrations/1677237343450-addNullable';
import { addUserId1677315373906 } from './migrations/1677315373906-addUserId';

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
      migrations: [
        init1677227825954,
        addDate1677228276963,
        addNullable1677237343450,
        addUserId1677315373906,
      ],
      entities: [UserEntity, PassportEntity, TokenEntity],
      dropSchema: false,
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
