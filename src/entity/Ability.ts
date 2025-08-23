import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Sheet } from "./Sheet";

@Entity()
export class Ability {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ type: "text" })
    description: string;

    @ManyToMany(() => Sheet, sheet => sheet.abilities)
    sheets: Sheet[];
}
