import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1670595253718 implements MigrationInterface {
  name = 'Initial1670595253718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "passport" ("id" SERIAL NOT NULL, "data" character varying NOT NULL, CONSTRAINT "PK_48da3babc4ea0bcbb594251d892" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text, "password" text, "email" text, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "passport"`);
  }
}
