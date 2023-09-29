import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const skillsJson = JSON.stringify(require("../shared/skills.json"));
const abilitiesJson = JSON.stringify(require("../shared/abilities.json"));
const ritualsJson = JSON.stringify(require("../shared/rituals.json"));

@Entity({ name: "gamesettings" })
export class GameSettings {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 2 })
  diceScreenTime: number = 2;
  @Column({ default: 4 })
  diceCooldown: number = 4;
  @Column({ default: null, type: "text" })
  lastRolls: any = "[]";
  @Column({ default: null, type: "text" })
  skills: any = skillsJson;
  @Column({ default: null, type: "text" })
  abilities: any = abilitiesJson;
  @Column({ default: null, type: "text" })
  rituals: any = ritualsJson;
}
