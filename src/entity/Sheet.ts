import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'sheets'})
export class Sheet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:''})
    playerName:string = '';

    @Column({default:''})
    profileImageUrl:string = '';

    @Column({default:''})
    name: string = '';

    @Column({default:0})
    age: number = 0;

    @Column({default:''})
    gender: string = '';
    
    @Column({default:5})
    nex: number = 5;

    @Column({default:''})
    rank: string = '';

    @Column({default:''})
    class: string = '';

    @Column({default:''})
    origin: string = '';

    @Column({default:0})
    effortPoints: number;

    @Column({default:0})
    maxEffortPoints: number;

    @Column({default:''})
    proficiences: string;

    @Column({default:null, type:'longtext'})
    attributes: string;

    @Column({default:null, type:'longtext'})
    skills: string;

    @Column({default:null, type:'longtext'})
    abilities: string;

    @Column({default:null, type:'longtext'})
    rituals: string;

    @Column({default:null, type:'longtext'})
    weapons: string;

    @Column({default:null, type:'longtext'})
    inventory: string;

    @Column({default:0})
    hp: number=0;

    @Column({default:0})
    maxHp: number=0;

    @Column({default:0})
    sanity: number=0;

    @Column({default:0})
    maxSanity: number=0;

    @Column({default:0})
    passiveDefense: number;

    @Column({default:0})
    blockDefense: number=0;    

    @Column({default:0})
    dodgeDefense: number=0;

    @Column({default:0})
    physicsResistance: number=0;

    @Column({default:0})
    ballisticResistance: number=0;

    @Column({default:0})
    energyResistance: number=0;

    @Column({default:0})
    bloodResistance: number=0;

    @Column({default:0})
    deathResistance: number=0;

    @Column({default:0})
    knowledgeResistance: number=0;

    @Column({default:0})
    insanityResistance: number=0;
    
    @Column({default:''})
    notes: string = '';

    updateData(newSheet:any) {
        this.name = newSheet.name;
        this.playerName = newSheet.playerName;
        this.profileImageUrl = newSheet.profileImageUrl;
        this.hp = newSheet.hp;
        this.maxHp = newSheet.maxHp;
        this.sanity = newSheet.sanity;
        this.maxSanity = newSheet.maxSanity;
        this.age = newSheet.age;
        this.nex = newSheet.nex;
        this.origin = newSheet.origin;
        this.gender = newSheet.gender;
        this.rank = newSheet.rank;
        this.class = newSheet.class;
        this.effortPoints = newSheet.effortPoints;
        this.maxEffortPoints = newSheet.maxEffortPoints;
        this.blockDefense = newSheet.blockDefense;
        this.passiveDefense = newSheet.passiveDefense;
        this.dodgeDefense = newSheet.dodgeDefense;
        this.attributes = JSON.stringify(newSheet.attributes);
        this.skills = JSON.stringify(newSheet.skills);
        this.abilities = JSON.stringify(newSheet.abilities);
        this.rituals = JSON.stringify(newSheet.rituals);
        this.inventory = JSON.stringify(newSheet.inventory);
        this.weapons = JSON.stringify(newSheet.weapons);
        this.ballisticResistance = newSheet.ballisticResistance;
        this.deathResistance = newSheet.deathResistance;
        this.energyResistance = newSheet.energyResistance;
        this.bloodResistance = newSheet.bloodResistance;
        this.physicsResistance = newSheet.physicsResistance;
        this.insanityResistance = newSheet.insanityResistance;
        this.knowledgeResistance = newSheet.knowledgeResistance;
        this.proficiences = newSheet.proficiences;
        this.notes = newSheet.notes;
    }

    parseArrays() {
        this.skills = JSON.parse(this.skills);
        this.attributes = JSON.parse(this.attributes);
        this.abilities = JSON.parse(this.abilities);
        this.rituals = JSON.parse(this.rituals);
        this.inventory = JSON.parse(this.inventory);
        this.weapons = JSON.parse(this.weapons);
    }
}
