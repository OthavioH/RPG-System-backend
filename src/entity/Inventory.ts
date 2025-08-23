import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Sheet } from "./Sheet";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    sheetId: number;

    @OneToOne(() => Sheet, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sheetId" })
    sheet: Sheet;

    @Column({ default: 0 })
    usedSlots: number;

    @Column({ default: 0 })
    slots: number;
}