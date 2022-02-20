import { Request, Response } from 'express';

import { GameSettings } from '../models/GameSettings';
import { Sheet } from '../models/Sheet';

export const sheetController = {
    async createSheet(req:Request,res:Response) {
        const {name} =req.body;

        const sheet = await Sheet.create({
            name:name,
        }).catch((err)=>{
            return res.status(500).json({error:err});
        });

        return res.status(200).json({sheet:sheet});
    },

    async deleteById(req:Request,res:Response) {
        const {id} =req.body;

        return await Sheet.destroy({where:{id:id}})
        .then((_)=>res.status(200).send('Sheet deleted'))
        .catch((err)=>res.status(500).json({error:err}));
    }, 
    async updateHpAndSanity(req:Request, res:Response) {
        const {id, hp, maxHp, sanity, maxSanity} =req.body;

        const sheet = await Sheet.findByPk(id);
        if (!sheet) {
            return res.status(500).send('Sheet not found');
        }
        await sheet.update(id,{
            hp:hp,
            maxHp:maxHp,
            sanity:sanity,
            maxSanity:maxSanity,
        });
        return res.status(200);
    },
    async updateOne(req:Request,res:Response) {
        const {id,playerName, name, age, gender, hp, occultismPoints, skills, attributes} =req.body;

        const sheet = await Sheet.update({
            name:name,
            playerName: playerName,
            age: age,
            gender: gender,
            hp: hp,
            occultismPoints: occultismPoints,
            skills: JSON.stringify(skills),
            attributes: JSON.stringify(attributes),
        }, {where:{id:id}}).catch((err)=>{
            return res.status(500).json({error:err});
        });

        return res.status(200).json({sheet:sheet});
    },

    async getSheetById(req:Request,res:Response) {
        const {id} =req.body;

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

    async updateMany(sheetList: any) {
        await sheetList.map(async(sheet)=> await Sheet.findOne({where:{id:sheet.id}}) != null 
        ? await Sheet.update({
            name: sheet.name,
            playerName: sheet.playerName,
            age: sheet.age,
            gender: sheet.gender,
            hp: sheet.hp,
            occultismPoints: sheet.occultismPoints,
            sheets: JSON.stringify(sheet.sheets),
            skills: JSON.stringify(sheet.skills),
            attributes: JSON.stringify(sheet.attributes)
        },{where:{id:sheet.id}})
        : await Sheet.create({
            name: sheet.name,
            playerName: sheet.playerName,
            age: sheet.age,
            gender: sheet.gender,
            sheets: JSON.stringify(sheet.sheets),
            skills: JSON.stringify(sheet.skills),
            attributes: JSON.stringify(sheet.attributes),
        }));
    }
};