import { Request, Response } from 'express';
import { socket } from '../app';

import { GameSettings } from '../models/GameSettings';

export const gameSettingsController = {
    async createGameSettings() {
        const gameSettings = await GameSettings.create({id:1}).catch((err)=>{
            console.error(err);
        });
        return gameSettings;
    },
    async saveGameProperties(req:Request,res:Response) {
        const {skills, abilities,rituals} = <any>req.body;

        const skillsJSON = skills != null ? JSON.parse(JSON.stringify(skills)) : skills;
        const abilitiesJSON = abilities != null ? JSON.parse(JSON.stringify(abilities)) : abilities;
        const ritualsJSON = rituals != null ? JSON.parse(JSON.stringify(rituals)) : rituals;

        console.log(skills);

        await GameSettings.update({
            skills: skillsJSON,
            abilities:abilitiesJSON,
            rituals:ritualsJSON,
        },{where:{id:1}});

        const gameSettings = await GameSettings.findByPk(1);

        return res.status(200).json(gameSettings);
    },
    async saveTimers(req:Request,res:Response){
        const {diceCooldown, diceScreenTime} = <any>req.body;

        await GameSettings.update({
            diceCooldown: diceCooldown,
            diceScreenTime: diceScreenTime,
        },{where:{id:1}});

        const gameSettings = await GameSettings.findByPk(1);

        return res.status(200).json(gameSettings);
    },
    async addNewRoll(req:Request,res:Response){
        const {roll, oldRollList} = req.body;
        const rollList:any[] = oldRollList;
        rollList.unshift(roll);
        if (rollList.length >= 11) {
            rollList.pop();
        }
        
        const actualRollList = rollList;

        const lastRollsJSON = JSON.parse(JSON.stringify(actualRollList));

        await GameSettings.update({
            lastRolls:lastRollsJSON
        },{where:{id:1}});

        socket.emit('lastRollListChanged', actualRollList);

        return res.status(200).json(actualRollList);
    },
    async getGameSettings(req:Request,res:Response) {
        const gameSettings = await GameSettings.findByPk(1);
        
        if(gameSettings) {
            return res.status(200).json(gameSettings);
        }
        return res.status(500);
    },
};