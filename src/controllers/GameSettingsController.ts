import { Request, Response } from 'express';

import { GameSettings } from '../models/GameSettings';
import { sheetController } from './SheetController';

export const gameSettingsController = {
    async save(req:Request,res:Response) {
        const {diceScreenTime, diceCooldown, sheets, skills, attributes} =req.body;

        const skillsJSON = JSON.stringify(skills);
        const attributesJSON = JSON.stringify(attributes);

        const gameSettingsFound = await GameSettings.findOne({where:{id:1}});

        if(gameSettingsFound){
            const gameSettings = await GameSettings.create({
                diceScreenTime:diceScreenTime,
                diceCooldown: diceCooldown,
                skills: skillsJSON,
                attributes: attributesJSON,
            }).catch((err)=>{
                return res.status(500).json({error:err});
            });
            await sheetController.updateMany(sheets);

            return res.status(200).json({gameSettings:gameSettings});
        }
        else {
            return res.status(500);
        }

    },
    async getGameSettings(req:Request,res:Response) {
        const gameSettings = await GameSettings.findAll();
        if(gameSettings){
            return res.status(200).json({gameSettings:gameSettings[0]});
        }
    },
};