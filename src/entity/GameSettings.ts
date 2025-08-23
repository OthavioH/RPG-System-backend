import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "gamesettings" })
export class GameSettings {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ default: 2 })
  diceScreenTime: number = 2;
  @Column({ default: 4 })
  diceCooldown: number = 4;
}
