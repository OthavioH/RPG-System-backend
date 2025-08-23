
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Sheet } from "./Sheet";


export enum RitualElement {
	energy = 'energia',
	death = 'morte',
	knowledge = 'conhecimento',
	fear = 'medo',
	blood = 'sangue',
	unknown = '?'
}

@Entity()
export class Ritual {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	circle: number;

	@Column()
	execution: string;

	@Column()
	range: string;

	@Column()
	target: string;

	@Column()
	duration: string;

	@Column({ type: "text" })
	description: string;

	@Column()
	resistance: string;

	@Column({
		type: "simple-array"
	})
	elements: RitualElement[];

	@ManyToMany(() => Sheet, sheet => sheet.rituals)
	sheets: Sheet[];
}
