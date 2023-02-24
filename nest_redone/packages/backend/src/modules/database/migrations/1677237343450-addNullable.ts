import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNullable1677237343450 implements MigrationInterface {
  name = 'addNullable1677237343450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."token" ALTER COLUMN "token" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."token" ALTER COLUMN "ip" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."token" ALTER COLUMN "os" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."token" ALTER COLUMN "name" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."token" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."token" ALTER COLUMN "os" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."token" ALTER COLUMN "ip" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."token" ALTER COLUMN "token" SET NOT NULL`,
    );
  }
}
