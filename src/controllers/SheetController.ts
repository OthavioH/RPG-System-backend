import { Sheet } from "../entity/Sheet";
import { AppDataSource } from "../config/data-source";
import { socketController } from "../app";
import getDefaultAttributes from "../utils/default_attributes";
import getDefaultInventory from "../utils/default_inventory";
import { FastifyReply, FastifyRequest } from "fastify";

export class SheetController {
  private static sheetRepository = AppDataSource.getRepository(Sheet);

  constructor() {}

  static async createSheet(req: FastifyRequest, reply: FastifyReply) {
    const { name } = req.body as any;
    if (!name) {
      return reply.status(400).send({ message: "Name is required" });
    }

    const sheet = SheetController.sheetRepository.create({ name });

    await SheetController.sheetRepository.save(sheet);
    socketController.emitCharacterListChanged(sheet, "create");
    return reply.status(201).send(sheet);
  }

  static async getSheet(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const { id } = req.params;
    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: id },
    });

    if (sheet) {
      
      return reply.status(200).send(sheet);
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async updateSheet(req: FastifyRequest<{Params: {id: string}, Body: any}>, reply: FastifyReply) {
    const { id } = req.params;
    const sheetData = req.body as any;

    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: id },
    });

    if (sheet) {
      const allowedFields = [
        'name', 'playerName', 'profileImageUrl', 'age', 'gender', 'nex', 'rank', 
        'class', 'origin', 'effortPoints', 'maxEffortPoints', 'proficiences', 
        'hp', 'maxHp', 'sanity', 'maxSanity', 'passiveDefense', 'blockDefense', 
        'dodgeDefense', 'physicsResistance', 'ballisticResistance', 'energyResistance', 
        'bloodResistance', 'deathResistance', 'knowledgeResistance', 'insanityResistance', 'notes'
      ];

      const updateData = Object.keys(sheetData)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = sheetData[key];
          return obj;
        }, {} as any);

      Object.assign(sheet, updateData);

      await SheetController.sheetRepository.save(sheet);
      socketController.emitCharacterChanged(sheet);
      return reply.status(200).send(sheet);
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async deleteSheet(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const { id } = req.params;
    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: id },
    });

    if (sheet) {
      await SheetController.sheetRepository.remove(sheet);
      socketController.emitCharacterListChanged(sheet, "delete");
      return reply.status(200).send({ message: "Sheet deleted" });
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async getAllSheets(req: FastifyRequest, reply: FastifyReply) {
    const sheets = await SheetController.sheetRepository.find();
    return reply.status(200).send(sheets);
  }

  static async updateHp(req: FastifyRequest<{Params: {id: string}, Body: any}>, reply: FastifyReply) {
    const { id } = req.params;
    const { character } = req.body as any;
    const { hp, maxHp } = character;

    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: id },
    });

    if (sheet) {
      sheet.hp = hp;
      sheet.maxHp = maxHp;
      await SheetController.sheetRepository.save(sheet);
      return reply.status(200).send(sheet);
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async updateSanity(req: FastifyRequest<{Params: {id: string}, Body: any}>, reply: FastifyReply) {
    const { id } = req.params;
    const { character } = req.body as any;
    const { sanity, maxSanity } = character;

    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: id },
    });

    if (sheet) {
      sheet.sanity = sanity;
      sheet.maxSanity = maxSanity;
      await SheetController.sheetRepository.save(sheet);
      return reply.status(200).send(sheet);
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async getSheetsBySocket() {
    const sheets = await SheetController.sheetRepository.find();
    return sheets;
  }
}
