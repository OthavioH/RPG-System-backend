
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Inventory } from "./Inventory";

@Entity()
export class InventoryItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ default: 1 })
    quantity: number;


    @Column()
    details: string;

    @Column()
    slots: number;

    @Column()
    prestige: number;

    @ManyToOne(() => Inventory)
    @JoinColumn({ name: "inventoryId" })
    inventory: Inventory;

    @Column()
    inventoryId: string;
}
