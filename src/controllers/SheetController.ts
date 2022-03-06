import { Request, Response } from 'express';
import { socket } from '../app';

import { Sheet } from '../models/Sheet';

export const sheetController = {
    async createSheet(req:Request,res:Response) {
        const {name} = <any>req.body;

        const sheet = await Sheet.create({
            name:name,
            inventory:{"weight":"0", "maxWeight":"0","items":"[]"}
        }).catch((err)=>{
            return err;
        });

        return res.status(200).json({sheet:sheet});
    },

    async deleteById(req:Request,res:Response) {
        const {id} =req.params;

        console.log(id);
        
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
        const {character} =req.body;

        const sheet = await Sheet.update(
            character, {
                where:{id:id}
            }
            ).catch(
                (err)=>{
            return res.status(500).json({error:err});
        });

        socket.emit('characterChanged', character);

        return res.status(200).json({sheet:sheet});
    },
    async getSheetById(req:Request,res:Response) {
        const {id} =req.params;

        const sheet = await Sheet.findOne({where:{id:id}})
        .catch((err)=>res.status(500).json({error:err}));
        
        if(sheet){
            return res.status(200).json({sheet:sheet});
        }
    },

    async getAll(req:Request,res:Response){
        const sheetList = await Sheet.findAll();

        return res.status(200).json({sheetList: sheetList});
    },
};