import { Request, Response } from 'express';

import { GameSettings } from '../models/GameSettings';

export const gameSettingsController = {
    async createGameSettings() {
        const gameSettings = await GameSettings.create().catch((err)=>{
            console.error(err);
        });
        return gameSettings;
    },
    async save(req:Request,res:Response) {
        const {diceScreenTime, diceCooldown, skills, attributes} = <any>req.body;

        let skillsJSON;
        let attributesJSON;
        if (skills != null) skillsJSON = JSON.stringify(skills);
        
        if (attributes != null) attributesJSON = JSON.stringify(attributes);

        const gameSettingsFound = await GameSettings.findAll()[0];

        if(gameSettingsFound){
            const gameSettings = await GameSettings.create({
                diceScreenTime:diceScreenTime,
                diceCooldown: diceCooldown,
                skills: skillsJSON,
                attributes: attributesJSON,
            }).catch((err)=>{
                return res.status(500).json({error:err});
            });

            return res.status(200).json({gameSettings:gameSettings});
        }
        else {
            return res.status(500);
        }
    },
    async getGameSettings(req:Request,res:Response) {
        await gameSettingsController.createGameSettings();
        const gameSettings = await GameSettings.findAll()[0];
        if(gameSettings) {
            console.log("b");
            return res.status(200).json({gameSettings:gameSettings});
        }

    },
};