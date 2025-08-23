import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SheetSkill } from "./SheetSkill";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ type: "text" })
    description: string;

    @OneToMany(() => SheetSkill, sheetSkill => sheetSkill.skill)
    sheetSkills: SheetSkill[];
}
