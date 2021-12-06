import { Request, Response } from 'express';

import { GameSettings } from '../models/GameSettings';
import { SheetController } from './SheetController';

export const gameSettingsController = {
    async store(req:Request,res:Response) {
        const {diceScreenTime, diceCooldown, sheets, skills, attributes} =req.body;

        const sheetsJSON = JSON.stringify(sheets);
        const skillsJSON = JSON.stringify(skills);
        const attributesJSON = JSON.stringify(attributes);

        const gameSettings = await GameSettings.create({
            diceScreenTime:diceScreenTime,
            diceCooldown: diceCooldown,
            sheets: sheetsJSON,
            skills: skillsJSON,
            attributes: attributesJSON,
        }).catch((err)=>{
            return res.status(500).json({error:err});
        });

        await SheetController.updateMany(sheets);

        return res.status(200).json({gameSettings:gameSettings});
    },
    async getGameSettings(req:Request,res:Response) {
        const gameSettings = await GameSettings.findAll();
        if(gameSettings){
            return res.status(200).json({gameSettings:gameSettings[0]});
        }
    },
};