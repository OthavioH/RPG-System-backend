import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1755985291911 implements MigrationInterface {
    name = 'migration1755985291911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_2014c5bbdc2390f31a5570fae27"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "masterId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_2014c5bbdc2390f31a5570fae27" FOREIGN KEY ("masterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_2014c5bbdc2390f31a5570fae27"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "masterId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_2014c5bbdc2390f31a5570fae27" FOREIGN KEY ("masterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
