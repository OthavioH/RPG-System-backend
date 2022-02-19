import { Request, Response } from 'express';

import { GameSettings } from '../models/GameSettings';

export const gameSettingsController = {
    async createGameSettings() {
        const gameSettings = await GameSettings.create().catch((err)=>{
            console.error(err);
        });
        return gameSettings;
    },
    async saveSkillsAndAttributes(req:Request,res:Response) {
        const {skills, attributes} = <any>req.body;

        const skillsJSON = JSON.stringify(skills);
        const  attributesJSON = JSON.stringify(attributes);

        const gameSettings = await (await GameSettings.findByPk(1)).update(1,{
            skills: skillsJSON,
            attributes: attributesJSON,
        });

        return res.status(200).json({gameSettings:gameSettings});
    },
    async saveTimers(req:Request,res:Response){
        const {diceCooldown, diceScreenTime} = <any>req.body;

        const gameSettings = await (await GameSettings.findByPk(1)).update(1,{
            diceScreenTime:diceScreenTime,
            diceCooldown:diceCooldown,
        });

        return res.status(200).json({gameSettings:gameSettings});
    },
    async getGameSettings(req:Request,res:Response) {
        let gameSettings;
        gameSettings = await GameSettings.findByPk(1);
        
        if(gameSettings) {
            return res.status(200).json({gameSettings:gameSettings});
        }
        return res.status(500);
    },
};