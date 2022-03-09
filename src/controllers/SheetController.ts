import { Request, Response } from 'express';
import { socket } from '../app';
import { APIError } from '../models/APIError';

import { Sheet } from '../models/Sheet';

export const sheetController = {
    async createSheet(req:Request,res:Response) {
        const {name} = req.body;
        const {gameId} = req.query;

        const sheet = await Sheet.create({
            name:name,
            gameId:gameId,
            inventory:{"usedSlots":"0", "maxSlots":"0","items":"[]"},
            weapons:[],
        }).catch((err)=>new APIError(err));

        if (sheet instanceof APIError) {
            console.error(sheet.errorMessage);
            return res.status(500);
        }
        return res.status(200).json({sheet:sheet});

    },

    async deleteById(req:Request,res:Response) {
        const {id} = req.params;
        const {gameId} =req.query;
        
        const deletedSheet = await Sheet.destroy({where:{id:id,gameId:gameId}}).catch((err)=>new APIError(err));

        if (deletedSheet instanceof APIError) {
            console.error(deletedSheet.errorMessage);
            return res.status(500);
        }
        return res.status(200).json({message:'Sheet deleted'});
    }, 
    async updateHp(req:Request, res:Response) {
        const {id} = req.params;
        const {gameId} = req.query;
        const {character} =req.body;

        const {hp, maxHp} = character;

        const sheet = await Sheet.update({
            hp:hp,
            maxHp:maxHp,
        },{where:{id:id,gameId:gameId}}).catch((err)=>new APIError(err));

        if (sheet instanceof APIError) {
            console.error(sheet.errorMessage);
            return res.status(500);
        }
        return res.status(200).json({sheet:sheet});
    },
    async updateSanity(req:Request, res:Response) {
        const {id} = req.params;
        const {gameId} = req.query;
        const {character} =req.body;

        const {sanity, maxSanity} = character;

        const sheet = await Sheet.update({
            sanity:sanity,
            maxSanity:maxSanity,
        },{where:{id:id,gameId:gameId}}).catch((err)=>new APIError(err));

        if (sheet instanceof APIError) {
            console.error(sheet.errorMessage);
            return res.status(500);
        }
        return res.status(200);
    },
    async updateOne(req:Request,res:Response) {
        const {id} = req.params;
        const {gameId} = req.query;
        const {character} =req.body;

        const sheet = await Sheet.update(
            character, {
                where:{id:id,gameId:gameId},
            }
            ).catch(
                (err)=>new APIError(err));

        if (sheet instanceof APIError) {
            console.error(sheet.errorMessage);
            return res.status(500);
        }
        socket.emit('characterChanged', {character:character,gameId:gameId});

        return res.status(200).json({sheet:sheet});
    },
    async getSheetById(req:Request,res:Response) {
        const {id} = req.params;
        const {gameId} =req.query;

        const sheet = await Sheet.findOne({where:{id:id, gameId:gameId}})
        .catch((err)=>new APIError(err));

        if (sheet instanceof APIError) {
            console.error(sheet.errorMessage);
            return res.status(500);
        }
        
        return res.status(200).json({sheet:sheet});
    },

    async getAll(req:Request,res:Response){

        const {gameId} = req.query;

        const sheetList = await Sheet.findAll({where: {gameId:gameId}}).catch(err =>new APIError(err));

        if (sheetList instanceof APIError) {
            console.error(sheetList.errorMessage);
            return res.status(500);
        }

        return res.status(200).json({sheetList: sheetList});
    },
};