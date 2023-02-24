import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDate1677228276963 implements MigrationInterface {
  name = 'addDate1677228276963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."token" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."token" DROP COLUMN "createdAt"`,
    );
  }
}
