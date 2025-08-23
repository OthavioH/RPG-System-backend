import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { WeaponInventory } from "./WeaponInventory";

@Entity()
export class Weapon {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    attack: string;

    @Column()
    range: string;

    @Column()
    damage: string;

    @Column()
    criticalDamage: string;

    @Column()
    special: string;

    @ManyToOne(() => WeaponInventory, { onDelete: "CASCADE" })
    @JoinColumn({ name: "weaponInventoryId" })
    weaponInventory: WeaponInventory;

    @Column()
    weaponInventoryId: string;
}