import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sheet } from "./Sheet";
import { Skill } from "./Skill";

export enum SkillExperienceLevel {
    untrained = 0,
    trained = 1,
    competent = 2,
    expert = 3
}

@Entity()
export class SheetSkill {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Sheet, sheet => sheet.skills, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sheetId" })
    sheet: Sheet;

    @Column()
    sheetId: string;

    @ManyToOne(() => Skill, skill => skill.sheetSkills, { onDelete: "CASCADE" })
    @JoinColumn({ name: "skillId" })
    skill: Skill;

    @Column()
    skillId: string;

    @Column({ default: 0 })
    value: number;

    @Column({ type: "int", default: 0 })
    experienceLevel: SkillExperienceLevel;
}
