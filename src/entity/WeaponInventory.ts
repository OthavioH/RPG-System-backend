import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sheet } from "./Sheet";

@Entity()
export class WeaponInventory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    sheetId: string;

    @ManyToOne(() => Sheet, sheet => sheet.weaponInventory, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sheetId" })
    sheet: Sheet;
}
