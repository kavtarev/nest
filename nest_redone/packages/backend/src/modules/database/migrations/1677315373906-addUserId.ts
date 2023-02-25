import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserId1677315373906 implements MigrationInterface {
  name = 'addUserId1677315373906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."token" ADD "userId" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."token" DROP COLUMN "userId"`,
    );
  }
}
