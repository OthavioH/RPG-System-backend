import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm";
import { Sheet } from "./Sheet";
import { Ritual } from "./Ritual";


@Entity()
@Unique(["sheet", "ritual"])
export class SheetRitual {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Sheet, sheet => sheet.rituals, { onDelete: "CASCADE" })
    sheet: Sheet;

    @ManyToOne(() => Ritual, ritual => ritual.sheetRituals, { onDelete: "CASCADE" })
    ritual: Ritual;
}