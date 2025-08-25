import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1756133240023 implements MigrationInterface {
    name = 'migration1756133240023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "abilities" ("sheetsId" uuid NOT NULL, "abilityId" uuid NOT NULL, CONSTRAINT "PK_250700f8384ff8645bbedac4c6e" PRIMARY KEY ("sheetsId", "abilityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dad2ee4eebd872dd627e2334df" ON "abilities" ("sheetsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_365d507f05c70a3fc594041aa2" ON "abilities" ("abilityId") `);
        await queryRunner.query(`CREATE TABLE "rituals" ("sheetsId" uuid NOT NULL, "ritualId" uuid NOT NULL, CONSTRAINT "PK_767a93642433fa315278994c5b4" PRIMARY KEY ("sheetsId", "ritualId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2643ab2c228b273310005ef248" ON "rituals" ("sheetsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_df54cbde612b7bfc78650336fa" ON "rituals" ("ritualId") `);
        await queryRunner.query(`ALTER TABLE "abilities" ADD CONSTRAINT "FK_dad2ee4eebd872dd627e2334dff" FOREIGN KEY ("sheetsId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "abilities" ADD CONSTRAINT "FK_365d507f05c70a3fc594041aa26" FOREIGN KEY ("abilityId") REFERENCES "ability"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rituals" ADD CONSTRAINT "FK_2643ab2c228b273310005ef2483" FOREIGN KEY ("sheetsId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rituals" ADD CONSTRAINT "FK_df54cbde612b7bfc78650336fa3" FOREIGN KEY ("ritualId") REFERENCES "ritual"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rituals" DROP CONSTRAINT "FK_df54cbde612b7bfc78650336fa3"`);
        await queryRunner.query(`ALTER TABLE "rituals" DROP CONSTRAINT "FK_2643ab2c228b273310005ef2483"`);
        await queryRunner.query(`ALTER TABLE "abilities" DROP CONSTRAINT "FK_365d507f05c70a3fc594041aa26"`);
        await queryRunner.query(`ALTER TABLE "abilities" DROP CONSTRAINT "FK_dad2ee4eebd872dd627e2334dff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df54cbde612b7bfc78650336fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2643ab2c228b273310005ef248"`);
        await queryRunner.query(`DROP TABLE "rituals"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_365d507f05c70a3fc594041aa2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dad2ee4eebd872dd627e2334df"`);
        await queryRunner.query(`DROP TABLE "abilities"`);
    }

}
