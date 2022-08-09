import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const skillsJson = JSON.stringify(require('../shared/skills.json'));
const abilitiesJson = JSON.stringify(require('../shared/abilities.json'));
const ritualsJson = JSON.stringify(require('../shared/rituals.json'));

@Entity({name:'gamesettings'})
export class GameSettings {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default:true})
    diceScreenTime: number = 2;
    @Column({default:true})
    diceCooldown: number = 4;
    @Column({default:null, type:'longtext'})
    lastRolls: any = "[]";
    @Column({default:null, type:'longtext'})
    skills: any = skillsJson;
    @Column({default:null, type:'longtext'})
    abilities: any = abilitiesJson;
    @Column({default:null, type:'longtext'})
    rituals: any = ritualsJson;
}