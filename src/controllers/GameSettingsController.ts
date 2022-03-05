import { Request, Response } from 'express';

import { GameSettings } from '../models/GameSettings';

export const gameSettingsController = {
    async createGameSettings() {
        const gameSettings = await GameSettings.create({id:1}).catch((err)=>{
            console.error(err);
        });
        return gameSettings;
    },
    async saveGameProperties(req:Request,res:Response) {
        const {skills, attributes,abilities,rituals} = <any>req.body;

        const skillsJSON = skills != null ? JSON.parse(JSON.stringify(skills)) : skills;
        const attributesJSON = attributes != null ? JSON.parse(JSON.stringify(attributes)) : attributes;
        const abilitiesJSON = abilities != null ? JSON.parse(JSON.stringify(abilities)) : abilities;
        const ritualsJSON = rituals != null ? JSON.parse(JSON.stringify(rituals)) : rituals;

        console.log(skills);

        await GameSettings.update({
            skills: skillsJSON,
            attributes: attributesJSON,
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
    async updateLastRollsList(req:Request,res:Response){
        const {lastRollsList} = req.body;

        const lastRollsJSON = JSON.parse(JSON.stringify(lastRollsList));

        await GameSettings.update({
            lastRolls:lastRollsJSON
        },{where:{id:1}});

        const gameSettings = await GameSettings.findByPk(1);

        return res.status(200).json(gameSettings);
    },
    async getGameSettings(req:Request,res:Response) {
        const gameSettings = await GameSettings.findByPk(1);
        
        if(gameSettings) {
            return res.status(200).json({gameSettings:gameSettings, port:process.env.PORT});
        }
        return res.status(500);
    },
};