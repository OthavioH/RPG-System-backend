import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Sheet } from "./Sheet";
import { InventoryItem } from "./InventoryItem";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    sheetId: string;

    @OneToOne(() => Sheet, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sheetId" })
    sheet: Sheet;

    @Column({ default: 0 })
    usedSlots: number;

    @Column({ default: 0 })
    slots: number;

    @OneToMany(() => InventoryItem, inventoryItem => inventoryItem.inventory, { cascade: true })
    items: InventoryItem[];
}