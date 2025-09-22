import { MigrationInterface, QueryRunner } from "typeorm";
import { Attribute } from "../entity/Attribute";

export class CreateDefaultAttributesMigration1727024000000 implements MigrationInterface {
    name = 'CreateDefaultAttributesMigration1727024000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const attributes = [
            { name: "Força" },
            { name: "Agilidade" },
            { name: "Vigor" },
            { name: "Inteligência" },
            { name: "Presença" },
        ];

        await queryRunner.manager.getRepository(Attribute).save(attributes);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const attributeNames = ["Força", "Agilidade", "Vigor", "Inteligência", "Presença"];
        
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from(Attribute)
            .where("name IN (:...names)", { names: attributeNames })
            .execute();
    }
}
