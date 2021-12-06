import { Request, Response } from 'express';

import { Sheet } from '../models/Sheet';

export const SheetController = {
    async store(req:Request,res:Response) {
        const {playerName, name, age, gender, sheets, skills, attributes} =req.body;

        const sheetsJSON = JSON.stringify(sheets);
        const skillsJSON = JSON.stringify(skills);
        const attributesJSON = JSON.stringify(attributes);

        const sheet = await Sheet.create({
            name:name,
            playerName: playerName,
            age: age,
            gender: gender,
            sheets: sheetsJSON,
            skills: skillsJSON,
            attributes: attributesJSON,
        }).catch((err)=>{
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

    async deleteById(req:Request,res:Response) {
        const {id} =req.body;

        await Sheet.destroy({where:{id:id}})
        .then((_)=>res.status(200).send('Sheet deleted'))
        .catch((err)=>res.status(500).json({error:err}));
    }, 

    async updateOne(req:Request,res:Response) {
        const {id,playerName, name, age, gender, skills, attributes} =req.body;

        const sheet = await Sheet.update({
            name:name,
            playerName: playerName,
            age: age,
            gender: gender,
            skills: JSON.stringify(skills),
            attributes: JSON.stringify(attributes),
        }, {where:{id:id}}).catch((err)=>{
            return res.status(500).json({error:err});
        });

        return res.status(200).json({sheet:sheet});
    },

    async updateMany(sheetList: any) {
        await sheetList.map(async(sheet)=> await Sheet.findOne({where:{id:sheet.id}}) != null 
        ? await Sheet.update({
            name: sheet.name,
            playerName: sheet.playerName,
            age: sheet.age,
            gender: sheet.gender,
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