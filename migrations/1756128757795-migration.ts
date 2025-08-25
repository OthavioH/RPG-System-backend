import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1756128757795 implements MigrationInterface {
    name = 'migration1756128757795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_5a0887f7bc1a7a5e4e250645daf"`);
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "campaignId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_5a0887f7bc1a7a5e4e250645daf" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_5a0887f7bc1a7a5e4e250645daf"`);
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "campaignId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_5a0887f7bc1a7a5e4e250645daf" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
