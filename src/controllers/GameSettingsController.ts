import { Request, Response } from 'express';
import { socket } from '../app';

import { GameSettings } from '../models/GameSettings';

export const gameSettingsController = {
    async createGameSettings(req:Request,res:Response) {
        const {id} = req.body;

        const gameSettings = await GameSettings.create({id:id}).catch((err)=>{
            console.error(err);
        });
        return gameSettings;
    },
    async saveGameProperties(req:Request,res:Response) {
        const {skills, attributes,abilities,rituals} = <any>req.body;
        const id:any = req.query.id;

        const skillsJSON = skills != null ? JSON.parse(JSON.stringify(skills)) : skills;
        const attributesJSON = attributes != null ? JSON.parse(JSON.stringify(attributes)) : attributes;
        const abilitiesJSON = abilities != null ? JSON.parse(JSON.stringify(abilities)) : abilities;
        const ritualsJSON = rituals != null ? JSON.parse(JSON.stringify(rituals)) : rituals;

        await GameSettings.update({
            skills: skillsJSON,
            attributes: attributesJSON,
            abilities:abilitiesJSON,
            rituals:ritualsJSON,
        },{where:{id:id}});

        const gameSettings = await GameSettings.findByPk(id);

        return res.status(200).json(gameSettings);
    },
    async saveTimers(req:Request,res:Response){
        const {diceCooldown, diceScreenTime} = <any>req.body;
        const id:any = req.query.id;

        await GameSettings.update({
            diceCooldown: diceCooldown,
            diceScreenTime: diceScreenTime,
        },{where:{id:id}});

        const gameSettings = await GameSettings.findByPk(id);

        return res.status(200).json(gameSettings);
    },
    async addNewRoll(req:Request,res:Response){
        const {roll, oldRollList} = req.body;
        const id:any = req.query.id;

        const rollList:any[] = oldRollList;
        rollList.unshift(roll);
        if (rollList.length >= 11) {
            rollList.pop();
        }
        
        const actualRollList = rollList;

        const lastRollsJSON = JSON.parse(JSON.stringify(actualRollList));

        await GameSettings.update({
            lastRolls:lastRollsJSON
        },{where:{id:id}});

        socket.emit('lastRollListChanged', {actualRollList:actualRollList,gameId:id});

        return res.status(200).json({actualRollList: actualRollList,gameSettingsId:id});
    },
    async getGameSettings(req:Request,res:Response) {
        const id:any = req.query.id;
        
        const gameSettings = await GameSettings.findByPk(id);
        
        if(gameSettings) {
            return res.status(200).json(gameSettings);
        }
        return res.status(500);
    },
};