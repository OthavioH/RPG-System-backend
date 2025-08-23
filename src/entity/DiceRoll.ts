import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Campaign } from "./Campaign";
import { Sheet } from "./Sheet";

export interface IDiceRoll {
    id: string;
    sheetCharacterName: string;
    diceResult: number;
    diceFaces: number;
}

@Entity({
    name: "dice_rolls"
})
export class DiceRoll {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "int" })
    diceResult: number;

    @Column({ type: "int" })
    diceFaces: number;

    @Column({ nullable: true })
    campaignId: string;

    @ManyToOne(() => Campaign, campaign => campaign.diceRolls)
    @JoinColumn({ name: "campaignId" })
    campaign: Campaign;

    @Column({ nullable: true })
    sheetId: string;

    @ManyToOne(() => Sheet)
    @JoinColumn({ name: "sheetId" })
    sheet: Sheet;
}
