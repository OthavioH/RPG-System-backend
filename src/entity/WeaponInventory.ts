import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Sheet } from "./Sheet";
import { Weapon } from "./Weapon";

@Entity()
export class WeaponInventory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    sheetId: string;

    @ManyToOne(() => Sheet, sheet => sheet.weaponInventory, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sheetId" })
    sheet: Sheet;

    @OneToMany(() => Weapon, weapon => weapon.weaponInventory, { cascade: true })
    weapons: Weapon[];
}
