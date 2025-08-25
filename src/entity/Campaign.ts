import { Column, Entity, ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Sheet } from "./Sheet";
import { DiceRoll } from "./DiceRoll";

@Entity({
    name: "campaigns"
})
export class Campaign {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ default: 2 })
    diceScreenTime: number;

    @Column({ default: 4 })
    diceCooldown: number;

    @Column()
    masterId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "masterId" })
    master: User;

    @OneToMany(() => Sheet, sheet => sheet.campaign)
    sheets: Sheet[];

    @OneToMany(() => DiceRoll, diceRoll => diceRoll.campaign)
    diceRolls: DiceRoll[];
}