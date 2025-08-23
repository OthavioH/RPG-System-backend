import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1755982768290 implements MigrationInterface {
    name = 'migration1755982768290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dice_rolls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "diceResult" integer NOT NULL, "diceFaces" integer NOT NULL, "campaignId" uuid, "sheetId" uuid, CONSTRAINT "PK_2882fa99113d0d9870d22178388" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sheetId" uuid NOT NULL, "usedSlots" integer NOT NULL DEFAULT '0', "slots" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_3533fb22ebb3cb76b2ddd587345" UNIQUE ("sheetId"), CONSTRAINT "REL_3533fb22ebb3cb76b2ddd58734" UNIQUE ("sheetId"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon_inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sheetId" uuid NOT NULL, CONSTRAINT "UQ_51722caaa79526b1d00597c0779" UNIQUE ("sheetId"), CONSTRAINT "PK_659c8cf13e2da186591fcd8f0c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ritual" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "circle" integer NOT NULL, "execution" character varying NOT NULL, "range" character varying NOT NULL, "target" character varying NOT NULL, "duration" character varying NOT NULL, "description" text NOT NULL, "resistance" character varying NOT NULL, "elements" text NOT NULL, CONSTRAINT "PK_34e13a47263dbcfffe179b502d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_5643559d435d01ec126981417a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sheet_skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sheetId" uuid NOT NULL, "skillId" uuid NOT NULL, "value" integer NOT NULL DEFAULT '0', "experienceLevel" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_59098fae1ddf93f0bd43b6bd953" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sheet_attribute" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sheetId" uuid NOT NULL, "attributeId" uuid NOT NULL, "value" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_3233579b3526835fc8e3f3be73e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_350fb4f7eb87e4c7d35c97a9828" UNIQUE ("name"), CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "details" character varying NOT NULL, "slots" integer NOT NULL, "prestige" integer NOT NULL, "inventoryId" uuid NOT NULL, CONSTRAINT "PK_94f5cbcb5f280f2f30bd4a9fd90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "attack" character varying NOT NULL, "range" character varying NOT NULL, "damage" character varying NOT NULL, "criticalDamage" character varying NOT NULL, "special" character varying NOT NULL, "weaponInventoryId" uuid NOT NULL, CONSTRAINT "PK_41fe726bde6432339c1d4595d29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sheet_abilities" ("sheetsId" uuid NOT NULL, "abilityId" uuid NOT NULL, CONSTRAINT "PK_f872f71b4eca744e9ac11b0605d" PRIMARY KEY ("sheetsId", "abilityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_904aed06bfe4502e9810237309" ON "sheet_abilities" ("sheetsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a6539b7e1a59feea7c1363c83" ON "sheet_abilities" ("abilityId") `);
        await queryRunner.query(`CREATE TABLE "sheet_rituals" ("sheetsId" uuid NOT NULL, "ritualId" uuid NOT NULL, CONSTRAINT "PK_6f8d39c5efd43c329fc3fea88dc" PRIMARY KEY ("sheetsId", "ritualId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7163cf28b5aac800e056a82f92" ON "sheet_rituals" ("sheetsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be0095bfe1a6329a70feb4f5e0" ON "sheet_rituals" ("ritualId") `);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "playerName"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "attributes"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "abilities"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "rituals"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "weapons"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "inventory"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "diceScreenTime" integer NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "diceCooldown" integer NOT NULL DEFAULT '4'`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "campaignId" uuid`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "weaponInventoryId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "UQ_9741350129fe9438fcd5f1476fb" UNIQUE ("weaponInventoryId")`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "inventoryId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "UQ_b01c091fe7ecf3e1b1021e19d39" UNIQUE ("inventoryId")`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "PK_0a9a8def984c3b725a18269db3c"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "PK_0a9a8def984c3b725a18269db3c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "dice_rolls" ADD CONSTRAINT "FK_e4f16c9c21040eb0e34bb88cd25" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dice_rolls" ADD CONSTRAINT "FK_4468f922df94c6e5b1537425e0d" FOREIGN KEY ("sheetId") REFERENCES "sheets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_3533fb22ebb3cb76b2ddd587345" FOREIGN KEY ("sheetId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon_inventory" ADD CONSTRAINT "FK_51722caaa79526b1d00597c0779" FOREIGN KEY ("sheetId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheet_skill" ADD CONSTRAINT "FK_043562c8d15583b1230d6f0e946" FOREIGN KEY ("sheetId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheet_skill" ADD CONSTRAINT "FK_d6c3e9286f11e4dfc7b0cc238d9" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheet_attribute" ADD CONSTRAINT "FK_a951b0974c5d02d961eb36dec9b" FOREIGN KEY ("sheetId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheet_attribute" ADD CONSTRAINT "FK_54d2c27ff1daefb924ce8825084" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_5a0887f7bc1a7a5e4e250645daf" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_9741350129fe9438fcd5f1476fb" FOREIGN KEY ("weaponInventoryId") REFERENCES "weapon_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_b01c091fe7ecf3e1b1021e19d39" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_ce6b6a0a8ba96d183b0d2104621" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon" ADD CONSTRAINT "FK_0b41602ecdb0ff7396a77397a89" FOREIGN KEY ("weaponInventoryId") REFERENCES "weapon_inventory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheet_abilities" ADD CONSTRAINT "FK_904aed06bfe4502e98102373092" FOREIGN KEY ("sheetsId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sheet_abilities" ADD CONSTRAINT "FK_6a6539b7e1a59feea7c1363c83e" FOREIGN KEY ("abilityId") REFERENCES "ability"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sheet_rituals" ADD CONSTRAINT "FK_7163cf28b5aac800e056a82f921" FOREIGN KEY ("sheetsId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sheet_rituals" ADD CONSTRAINT "FK_be0095bfe1a6329a70feb4f5e00" FOREIGN KEY ("ritualId") REFERENCES "ritual"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheet_rituals" DROP CONSTRAINT "FK_be0095bfe1a6329a70feb4f5e00"`);
        await queryRunner.query(`ALTER TABLE "sheet_rituals" DROP CONSTRAINT "FK_7163cf28b5aac800e056a82f921"`);
        await queryRunner.query(`ALTER TABLE "sheet_abilities" DROP CONSTRAINT "FK_6a6539b7e1a59feea7c1363c83e"`);
        await queryRunner.query(`ALTER TABLE "sheet_abilities" DROP CONSTRAINT "FK_904aed06bfe4502e98102373092"`);
        await queryRunner.query(`ALTER TABLE "weapon" DROP CONSTRAINT "FK_0b41602ecdb0ff7396a77397a89"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_ce6b6a0a8ba96d183b0d2104621"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_b01c091fe7ecf3e1b1021e19d39"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_9741350129fe9438fcd5f1476fb"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_5a0887f7bc1a7a5e4e250645daf"`);
        await queryRunner.query(`ALTER TABLE "sheet_attribute" DROP CONSTRAINT "FK_54d2c27ff1daefb924ce8825084"`);
        await queryRunner.query(`ALTER TABLE "sheet_attribute" DROP CONSTRAINT "FK_a951b0974c5d02d961eb36dec9b"`);
        await queryRunner.query(`ALTER TABLE "sheet_skill" DROP CONSTRAINT "FK_d6c3e9286f11e4dfc7b0cc238d9"`);
        await queryRunner.query(`ALTER TABLE "sheet_skill" DROP CONSTRAINT "FK_043562c8d15583b1230d6f0e946"`);
        await queryRunner.query(`ALTER TABLE "weapon_inventory" DROP CONSTRAINT "FK_51722caaa79526b1d00597c0779"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_3533fb22ebb3cb76b2ddd587345"`);
        await queryRunner.query(`ALTER TABLE "dice_rolls" DROP CONSTRAINT "FK_4468f922df94c6e5b1537425e0d"`);
        await queryRunner.query(`ALTER TABLE "dice_rolls" DROP CONSTRAINT "FK_e4f16c9c21040eb0e34bb88cd25"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "PK_0a9a8def984c3b725a18269db3c"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "PK_0a9a8def984c3b725a18269db3c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "UQ_b01c091fe7ecf3e1b1021e19d39"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "inventoryId"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "UQ_9741350129fe9438fcd5f1476fb"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "weaponInventoryId"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP COLUMN "campaignId"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "diceCooldown"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "diceScreenTime"`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "inventory" text`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "weapons" text`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "rituals" text`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "abilities" text`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "skills" text`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "attributes" text`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD "playerName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be0095bfe1a6329a70feb4f5e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7163cf28b5aac800e056a82f92"`);
        await queryRunner.query(`DROP TABLE "sheet_rituals"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a6539b7e1a59feea7c1363c83"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_904aed06bfe4502e9810237309"`);
        await queryRunner.query(`DROP TABLE "sheet_abilities"`);
        await queryRunner.query(`DROP TABLE "weapon"`);
        await queryRunner.query(`DROP TABLE "inventory_item"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "sheet_attribute"`);
        await queryRunner.query(`DROP TABLE "sheet_skill"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "ability"`);
        await queryRunner.query(`DROP TABLE "ritual"`);
        await queryRunner.query(`DROP TABLE "weapon_inventory"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "dice_rolls"`);
    }

}
