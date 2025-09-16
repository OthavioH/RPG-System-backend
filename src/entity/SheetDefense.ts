import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sheet } from "./Sheet";

@Entity("SheetDefense")
export class SheetDefense {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: 0 })
    passiveDefense: number;

    @Column({ default: 0 })
    blockDefense: number = 0;

    @Column({ default: 0 })
    dodgeDefense: number = 0;

    @OneToOne(() => Sheet, sheet => sheet.defense, { onDelete: "CASCADE" })
    sheet: Sheet;
}