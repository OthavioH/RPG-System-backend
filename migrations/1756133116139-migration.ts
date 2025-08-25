import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1756133116139 implements MigrationInterface {
    name = 'migration1756133116139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "notes" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "notes" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "notes" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "notes" DROP NOT NULL`);
    }

}
