
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sheet } from "./Sheet";

@Entity("SheetResistances")
export class SheetResistances {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: 0 })
    physicsResistance: number = 0;

    @Column({ default: 0 })
    ballisticResistance: number = 0;

    @Column({ default: 0 })
    energyResistance: number = 0;

    @Column({ default: 0 })
    bloodResistance: number = 0;

    @Column({ default: 0 })
    deathResistance: number = 0;

    @Column({ default: 0 })
    knowledgeResistance: number = 0;

    @Column({ default: 0 })
    insanityResistance: number = 0;

    @OneToOne(() => Sheet, sheet => sheet.resistances, { onDelete: "CASCADE" })
    sheet: Sheet;
}