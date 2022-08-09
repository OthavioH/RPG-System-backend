import { Request, Response } from 'express';

import { Sheet } from '../entity/Sheet';
import { AppDataSource } from '../config/data-source';
import { socketController } from '../app';

export class SheetController {
    private static sheetRepository = AppDataSource.getRepository(Sheet);

    constructor(){}

    static async createSheet(req: Request, res: Response) {
        const { name } = req.body;
        const sheet = SheetController.sheetRepository.create({
            name:name,
            attributes: "{\"vigor\":{\"id\":\"3\",\"name\":\"Vigor\",\"value\":\"1\",\"abbreviation\":\"VIG\"},\"agility\":{\"id\":\"2\",\"name\":\"Agilidade\",\"value\":\"1\",\"abbreviation\":\"AGI\"},\"presence\":{\"id\":\"5\",\"name\":\"Presença\",\"value\":\"1\",\"abbreviation\":\"PRE\"},\"strength\":{\"id\":\"1\",\"name\":\"Força\",\"value\":\"1\",\"abbreviation\":\"FOR\"},\"intelligence\":{\"id\":\"4\",\"name\":\"Inteligência\",\"value\":1,\"abbreviation\":\"INT\"}}",
            inventory: "{\"usedSlots\":\"0\",\"maxSlots\":\"5\",\"items\":[]}",
            skills: "[]",
            abilities: "[]",
            rituals: "[]",
            weapons: "[]",
        });

        await SheetController.sheetRepository.save(sheet);
        sheet.parseArrays();
        socketController.emitCharacterListChanged(sheet, 'create');
    }

    static async getSheet(req: Request, res: Response) {
        const { id } = req.params;
        const sheet = await SheetController.sheetRepository.findOne({
            where: { id: Number(id) },
        });

        if (sheet) {
            sheet.parseArrays();
            return res.status(200).json(sheet);
        }
        return res.status(404).json({ message: 'Sheet not found' });
    }

    static async updateSheet(req: Request, res: Response) {
        const { id } = req.params;
        const { character } = req.body;
    
        const sheet = await SheetController.sheetRepository.findOne({
            where: { id: Number(id) },
        });

        if (sheet) {
            sheet.updateData(character);
            await SheetController.sheetRepository.save(sheet);
            sheet.parseArrays();
            socketController.emitCharacterChanged(sheet);
            return res.status(200).json(sheet);
        }
        return res.status(404).json({ message: 'Sheet not found' });
    }

    static async deleteSheet(req: Request, res: Response) {
        const { id } = req.params;
        const sheet = await SheetController.sheetRepository.findOne({
            where: { id: Number(id) },
        });

        if (sheet) {
            await SheetController.sheetRepository.remove(sheet);
            socketController.emitCharacterListChanged(sheet, 'delete');
            return res.status(200).json({ message: 'Sheet deleted' });
        }
        return res.status(404).json({ message: 'Sheet not found' });
    }

    static async getAllSheets(req: Request, res: Response) {
        const sheets = await SheetController.sheetRepository.find();

        sheets.forEach(sheet => {
            sheet.parseArrays();
        });

        return res.status(200).json(sheets);
    }

    static async updateHp(req: Request, res: Response) {
        const { id } = req.params;
        const { character } = req.body;
        const {hp, maxHp} = character;

        const sheet = await SheetController.sheetRepository.findOne({
            where: { id: Number(id) },
        });

        if (sheet) {
            sheet.hp = hp;
            sheet.maxHp = maxHp;
            await SheetController.sheetRepository.save(sheet);
            return res.status(200).json(sheet);
        }
        return res.status(404).json({ message: 'Sheet not found' });
    }

    static async updateSanity(req: Request, res: Response) {
        const { id } = req.params;
        const { character } = req.body;
        const {sanity, maxSanity} = character;

        const sheet = await SheetController.sheetRepository.findOne({
            where: { id: Number(id) },
        });

        if (sheet) {
            sheet.sanity = sanity;
            sheet.maxSanity = maxSanity;
            await SheetController.sheetRepository.save(sheet);
            return res.status(200).json(sheet);
        }
        return res.status(404).json({ message: 'Sheet not found' });
    }

    static async getSheetsBySocket(){
        const sheets = await SheetController.sheetRepository.find();
        return sheets;
    }
    
}
