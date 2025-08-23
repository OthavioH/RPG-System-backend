import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SheetAttribute } from "./SheetAttribute";

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => SheetAttribute, sheetAttribute => sheetAttribute.attribute)
    sheetAttributes: SheetAttribute[];
}
