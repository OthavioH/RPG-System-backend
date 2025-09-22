import { Sheet } from "../entity/Sheet";
import { AppDataSource } from "../config/data-source";
import { socketController } from "../app";
import getDefaultAttributes from "../utils/default_attributes";
import getDefaultInventory from "../utils/default_inventory";
import { FastifyReply, FastifyRequest } from "fastify";
import { Campaign } from "../entity/Campaign";
import { Inventory } from "../entity/Inventory";
import { WeaponInventory } from "../entity/WeaponInventory";
import { Attribute } from "../entity/Attribute";
import { SheetAttribute } from "../entity/SheetAttribute";
import { SheetDefense } from "../entity/SheetDefense";

export class SheetController {
  private static sheetRepository = AppDataSource.getRepository(Sheet);
  private static campaignRepository = AppDataSource.getRepository(Campaign);
  private static inventoryRepository = AppDataSource.getRepository(Inventory);
  private static weaponInventoryRepository = AppDataSource.getRepository(WeaponInventory);

  private static attributesRepository = AppDataSource.getRepository(Attribute);
  private static sheetAttributesRepository = AppDataSource.getRepository(SheetAttribute);

  constructor() { }

  static async createSheet(req: FastifyRequest<{
    Body: {
      sheetName: string,
      campaignId: string,
    }
  }>, reply: FastifyReply) {
    const { sheetName, campaignId } = req.body;

    const campaign = await SheetController.campaignRepository.findOne({
      where: { id: campaignId },
      relations: ['sheets']
    });

    if (!campaign) {
      return reply.status(404).send({ message: "Campaign not found" });
    }

    const sheet = SheetController.sheetRepository.create({
      name: sheetName,
      campaign: campaign
    });

    await SheetController.sheetRepository.save(sheet);
    campaign.sheets.push(sheet);
    await SheetController.campaignRepository.save(campaign);

    await SheetController.createDefaultAttributes(sheet.id);
    await SheetController.createDefaultInventory(sheet.id);
    await SheetController.createDefaultWeaponInventory(sheet.id);

    const updatedSheet = await SheetController.sheetRepository.findOne({
      where: { id: sheet.id },
      relations: {
        skills: true,
        inventory: {
          items: true,
        },
        weaponInventory: {
          weapons: true,
        },
        attributes: {
          attribute: true,
          sheet: false,
        },
        rituals: true,
        abilities: true,
        defense: true,
        resistances: true,
      },
    });

    socketController.emitCharacterListChanged(updatedSheet, "create");
    return reply.status(201).send(updatedSheet);
  }

  private static async createDefaultWeaponInventory(sheetId: string) {
    const weaponInventory = SheetController.weaponInventoryRepository.create({
      sheetId: sheetId,
    });
    await SheetController.weaponInventoryRepository.save(weaponInventory);

    await SheetController.sheetRepository.update(sheetId, { weaponInventoryId: weaponInventory.id });
  }

  private static async createDefaultInventory(sheetId: string) {
    const inventory = SheetController.inventoryRepository.create({
      sheetId: sheetId,
    });
    await SheetController.inventoryRepository.save(inventory);

    await SheetController.sheetRepository.update(sheetId, { inventoryId: inventory.id });
  }

  private static async createDefaultAttributes(sheetId: string) {
    const attrRepo = AppDataSource.getRepository(Attribute);
    const sheetAttrRepo = AppDataSource.getRepository(SheetAttribute);

    const attributes = await attrRepo.find();
    for (const attr of attributes) {
      const exists = await sheetAttrRepo.findOneBy({ sheetId: sheetId, attributeId: attr.id });
      if (!exists) {
        const sheetAttr = sheetAttrRepo.create({
          sheetId: sheetId,
          attributeId: attr.id,
          value: 0
        });
        await sheetAttrRepo.save(sheetAttr);
      }
    }
  }

  static async getSheet(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = req.params;
    const sheet = await SheetController.sheetRepository.findOne({
      where: { id: id },
      relations: {
        skills: true,
        inventory: {
          items: true,
        },
        weaponInventory: {
          weapons: true,
        },
        attributes: {
          attribute: true,
          sheet: false,
        },
        rituals: true,
        abilities: true,
        defense: true,
        resistances: true,
      },
      select: {
        attributes: {
          attribute: {
            name: true,
          },
          value: true,
          id: true,
          sheet: false,
          sheetId: false,
        }
      }
    });


    if (sheet) {

      return reply.status(200).send(sheet);
    }
    return reply.status(404).send({ message: "Sheet not found" });
  }

  static async updateSheet(req: FastifyRequest<{ Params: { id: string }, Body: any }>, reply: FastifyReply) {
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

  static async deleteSheet(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
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

  static async updateHp(req: FastifyRequest<{ Params: { id: string }, Body: any }>, reply: FastifyReply) {
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

  static async updateSanity(req: FastifyRequest<{ Params: { id: string }, Body: any }>, reply: FastifyReply) {
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
