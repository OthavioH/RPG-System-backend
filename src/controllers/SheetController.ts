import { Request, Response } from 'express';
import { socket } from '../app';

import { Sheet } from '../models/Sheet';

export const sheetController = {
    async createSheet(req:Request,res:Response) {
        const {name} = <any>req.body;

        const sheet = await Sheet.create({
            name:name,
            inventory:{"usedSlots":"0", "maxSlots":"5","items":[]},
            attributes:{
                "strength":{"id":"1","value":1, "name":"Força","abbreviation":"FOR"},
                "agility":{"id":"2","value":1, "name":"Agilidade","abbreviation":"AGI"},
                "vigor":{"id":"3","value":1, "name":"Vigor","abbreviation":"VIG"},
                "intelligence":{"id":"4","value":1, "name":"Inteligência","abbreviation":"INT"},
                "presence":{"id":"5","value":1, "name":"Presença","abbreviation":"PRE"},
            },
            weapons:[],
        }).catch((err)=>{
            return res.status(500).json({error:err});
        });

        return res.status(200).json({sheet:sheet});
    },

    async deleteById(req:Request,res:Response) {
        const {id} =req.params;
        
        let error = null;
        await Sheet.destroy({where:{id:id}})
        .catch((err)=>error = err);

        if (error != null) {
            res.status(500).json({error:error});
        }
        else {
            res.status(200).json({message:'Sheet deleted'});
        }
    }, 
    async updateHp(req:Request, res:Response) {
        const {id} = req.params;
        const {character} =req.body;

        const {hp, maxHp} = character;

        await Sheet.update({
            hp:hp,
            maxHp:maxHp,
        },{where:{id:id}}).catch((err)=>{
            return res.status(500).json({error:err});
        });
        return res.status(200);
    },
    async updateSanity(req:Request, res:Response) {
        const {id} = req.params;
        const {character} =req.body;

        const {sanity, maxSanity} = character;

        await Sheet.update({
            sanity:sanity,
            maxSanity:maxSanity,
        },{where:{id:id}}).catch((err)=>{
            return res.status(500).json({error:err});
        });
        return res.status(200);
    },
    async updateOne(req:Request,res:Response) {
        const {id} = req.params;

        const {character} = req.body;

        const attributesJSON = character.attributes != null ? JSON.parse(JSON.stringify(character.attributes)) : character.attributes;
        const skillsJSON = character.skills != null ? JSON.parse(JSON.stringify(character.skills)) : character.skills;
        const abilitesJSON = character.abilities != null ? JSON.parse(JSON.stringify(character.abilities)) : character.abilities;
        const ritualsJSON = character.rituals != null ? JSON.parse(JSON.stringify(character.rituals)) : character.rituals;
        const weaponsJSON = character.weapons != null ? JSON.parse(JSON.stringify(character.weapons)) : character.weapons;
        const inventoryJSON = character.inventory != null ? JSON.parse(JSON.stringify(character.inventory)) : character.inventory;

        const sheet = await Sheet.update(
            {
                name:character.name,
                playerName:character.playerName,
                age:character.age,
                gender:character.gender,
                nex:character.nex,
                rank:character.rank,
                class:character.class,
                origin:character.origin,
                effortPoints:character.effortPoints,
                maxEffortPoints:character.maxEffortPoints,
                proficiencies:character.proficiencies,
                profileImageUrl:character.profileImageUrl,
                attributes:attributesJSON,
                skills:skillsJSON,
                abilities:abilitesJSON,
                rituals:ritualsJSON,
                weapons:weaponsJSON,
                inventory:inventoryJSON,
                hp:character.hp,
                maxHp:character.maxHp,
                sanity:character.sanity,
                maxSanity:character.maxSanity,
                notes:character.notes,
                passiveDefense:character.passiveDefense,
                blockDefense:character.blockDefense,
                dodgeDefense:character.dodgeDefense,
                physicsResistence:character.physicsResistence,
                ballisticResistence:character.ballisticResistence,
                bloodResistence:character.bloodResistence,
                energyResistence:character.energyResistence,
                deathResistence:character.deathResistence,
                knowledgeResistence:character.knowledgeResistence,
                insanityResistence:character.insanityResistence,
            }, {
                where:{id:id}
            }).catch(
                (err)=>{
            return res.status(500).json({error:err});
        });

        socket.emit('characterChanged', character);

        return res.status(200).json({sheet:sheet});
    },
    async getSheetById(req:Request,res:Response) {
        const {id} =req.params;

        const sheet = await Sheet.findOne({where:{id:id}})
        .catch((err)=>err);
        
        return res.status(200).json({sheet:sheet});
    },

    async getAll(req:Request,res:Response){
        const sheetList = await Sheet.findAll();

        return res.status(200).json({sheetList: sheetList});
    },
};