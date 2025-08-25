import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1756131294927 implements MigrationInterface {
    name = 'migration1756131294927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_9741350129fe9438fcd5f1476fb"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_b01c091fe7ecf3e1b1021e19d39"`);
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "weaponInventoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "inventoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_9741350129fe9438fcd5f1476fb" FOREIGN KEY ("weaponInventoryId") REFERENCES "weapon_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_b01c091fe7ecf3e1b1021e19d39" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_b01c091fe7ecf3e1b1021e19d39"`);
        await queryRunner.query(`ALTER TABLE "sheets" DROP CONSTRAINT "FK_9741350129fe9438fcd5f1476fb"`);
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "inventoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ALTER COLUMN "weaponInventoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_b01c091fe7ecf3e1b1021e19d39" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sheets" ADD CONSTRAINT "FK_9741350129fe9438fcd5f1476fb" FOREIGN KEY ("weaponInventoryId") REFERENCES "weapon_inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
