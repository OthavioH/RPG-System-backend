import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sheet } from "./Sheet";
import { Attribute } from "./Attribute";

@Entity()
export class SheetAttribute {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Sheet, sheet => sheet.attributes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sheetId" })
    sheet: Sheet;

    @Column()
    sheetId: string;

    @ManyToOne(() => Attribute, attribute => attribute.sheetAttributes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "attributeId" })
    attribute: Attribute;

    @Column()
    attributeId: string;

    @Column({ default: 0 })
    value: number;
}
