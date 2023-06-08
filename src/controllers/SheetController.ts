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
    const sheet = SheetController.sheetRepository.create({
      name: name,
      attributes: getDefaultAttributes(),
      inventory: getDefaultInventory(),
      skills: "[]",
      abilities: "[]",
      rituals: "[]",
      weapons: "[]",
    });

    await SheetController.sheetRepository.save(sheet);
    sheet.parseArrays();
    socketController.emitCharacterListChanged(sheet, "create");
  }

  static async getSheet(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: Number(id) },
    });

    if (sheet) {
      sheet.parseArrays();
      return reply.status(200).send(sheet);
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async updateSheet(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const { character } = req.body as any;

    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: Number(id) },
    });

    if (sheet) {
      sheet.updateData(character);
      await SheetController.sheetRepository.save(sheet);
      sheet.parseArrays();
      socketController.emitCharacterChanged(sheet);
      return reply.status(200).send(sheet);
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async deleteSheet(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: Number(id) },
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

    sheets.forEach((sheet) => {
      sheet.parseArrays();
    });

    return reply.status(200).send(sheets);
  }

  static async updateHp(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const { character } = req.body as any;
    const { hp, maxHp } = character;

    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: Number(id) },
    });

    if (sheet) {
      sheet.hp = hp;
      sheet.maxHp = maxHp;
      await SheetController.sheetRepository.save(sheet);
      return reply.status(200).send(sheet);
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async updateSanity(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const { character } = req.body as any;
    const { sanity, maxSanity } = character;

    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: Number(id) },
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
