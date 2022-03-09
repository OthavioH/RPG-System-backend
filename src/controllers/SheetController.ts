import { Request, Response } from 'express';
import { socket } from '../app';

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
        }).catch((err)=>{
            return res.status(500).json({error:err});
        });

        return res.status(200).json({sheet:sheet});
    },

    async deleteById(req:Request,res:Response) {
        const {id} = req.params;
        const {gameId} =req.query;
        
        let error = null;
        await Sheet.destroy({where:{id:id,gameId:gameId}})
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
        const {gameId} = req.query;
        const {character} =req.body;

        const {hp, maxHp} = character;

        await Sheet.update({
            hp:hp,
            maxHp:maxHp,
        },{where:{id:id,gameId:gameId}}).catch((err)=>{
            return res.status(500).json({error:err});
        });
        return res.status(200);
    },
    async updateSanity(req:Request, res:Response) {
        const {id} = req.params;
        const {gameId} = req.query;
        const {character} =req.body;

        const {sanity, maxSanity} = character;

        await Sheet.update({
            sanity:sanity,
            maxSanity:maxSanity,
        },{where:{id:id,gameId:gameId}}).catch((err)=>{
            return res.status(500).json({error:err});
        });
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
                (err)=>{
            return res.status(500).json({error:err});
        });

        socket.emit('characterChanged', {character:character,gameId:gameId});

        return res.status(200).json({sheet:sheet});
    },
    async getSheetById(req:Request,res:Response) {
        const {id} = req.params;
        const {gameId} =req.query;

        const sheet = await Sheet.findOne({where:{id:id, gameId:gameId}})
        .catch((err)=>err);
        
        return res.status(200).json({sheet:sheet});
    },

    async getAll(req:Request,res:Response){

        const {gameId} = req.query;

        const sheetList = await Sheet.findAll({where: {gameId:gameId}});

        return res.status(200).json({sheetList: sheetList});
    },
};