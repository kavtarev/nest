import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1677227825954 implements MigrationInterface {
  name = 'init1677227825954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "passport" ("id" SERIAL NOT NULL, "data" character varying NOT NULL, CONSTRAINT "PK_48da3babc4ea0bcbb594251d892" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "ip" text NOT NULL, "os" text NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text, "password" text, "email" text, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "passport"`);
  }
}
