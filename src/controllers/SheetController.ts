import { Request, Response } from 'express';

import { Sheet } from '../models/Sheet';

export const sheetController = {
    async createSheet(req:Request,res:Response) {
        const {name} = <any>req.body;

        const sheet = await Sheet.create({
            name:name,
        }).catch((err)=>{
            return res.status(500).json({error:err});
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
    async updateHpAndSanity(req:Request, res:Response) {
        const {id} = req.params;
        const {character} =req.body;

        const {hp, maxHp, sanity, maxSanity} = character;

        await Sheet.update({
            hp:hp,
            maxHp:maxHp,
            sanity:sanity,
            maxSanity:maxSanity,
        },{where:{id:id}}).catch((err)=>{
            return res.status(500).json({error:err});
        });
        return res.status(200);
    },
    async updateOne(req:Request,res:Response) {
        const {id} = req.params;
        const {playerName, name, age, gender, hp, maxHp, sanity, maxSanity, skills, attributes, inventory, weapons, notes} =req.body;

        console.log(req.body);
        console.log(req.params);

        const sheet = await Sheet.update({
            name:name,
            playerName: playerName,
            age: age,
            gender: gender,
            hp: hp,
            maxHp: maxHp,
            sanity: sanity,
            maxSanity: maxSanity,
            skills: JSON.parse(JSON.stringify(skills)),
            attributes: JSON.parse(JSON.stringify(attributes)),
            inventory:JSON.parse(JSON.stringify(inventory)),
            weapons:JSON.parse(JSON.stringify(weapons)),
            notes: notes,
        }, {where:{id:id}}).catch((err)=>{
            return res.status(500).json({error:err});
        });

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