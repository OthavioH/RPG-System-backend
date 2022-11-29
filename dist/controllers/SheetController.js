"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetController = void 0;
const Sheet_1 = require("../entity/Sheet");
const data_source_1 = require("../config/data-source");
const app_1 = require("../app");
const default_attributes_1 = __importDefault(require("../utils/default_attributes"));
const default_inventory_1 = __importDefault(require("../utils/default_inventory"));
class SheetController {
    constructor() { }
    static createSheet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const sheet = SheetController.sheetRepository.create({
                name: name,
                attributes: (0, default_attributes_1.default)(),
                inventory: (0, default_inventory_1.default)(),
                skills: "[]",
                abilities: "[]",
                rituals: "[]",
                weapons: "[]",
            });
            yield SheetController.sheetRepository.save(sheet);
            sheet.parseArrays();
            app_1.socketController.emitCharacterListChanged(sheet, 'create');
        });
    }
    static getSheet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sheet = yield SheetController.sheetRepository.findOne({
                where: { id: Number(id) },
            });
            if (sheet) {
                sheet.parseArrays();
                return res.status(200).json(sheet);
            }
            return res.status(404).json({ message: 'Sheet not found' });
        });
    }
    static updateSheet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { character } = req.body;
            const sheet = yield SheetController.sheetRepository.findOne({
                where: { id: Number(id) },
            });
            if (sheet) {
                sheet.updateData(character);
                yield SheetController.sheetRepository.save(sheet);
                sheet.parseArrays();
                app_1.socketController.emitCharacterChanged(sheet);
                return res.status(200).json(sheet);
            }
            return res.status(404).json({ message: 'Sheet not found' });
        });
    }
    static deleteSheet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sheet = yield SheetController.sheetRepository.findOne({
                where: { id: Number(id) },
            });
            if (sheet) {
                yield SheetController.sheetRepository.remove(sheet);
                app_1.socketController.emitCharacterListChanged(sheet, 'delete');
                return res.status(200).json({ message: 'Sheet deleted' });
            }
            return res.status(404).json({ message: 'Sheet not found' });
        });
    }
    static getAllSheets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets = yield SheetController.sheetRepository.find();
            sheets.forEach(sheet => {
                sheet.parseArrays();
            });
            return res.status(200).json(sheets);
        });
    }
    static updateHp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { character } = req.body;
            const { hp, maxHp } = character;
            const sheet = yield SheetController.sheetRepository.findOne({
                where: { id: Number(id) },
            });
            if (sheet) {
                sheet.hp = hp;
                sheet.maxHp = maxHp;
                yield SheetController.sheetRepository.save(sheet);
                return res.status(200).json(sheet);
            }
            return res.status(404).json({ message: 'Sheet not found' });
        });
    }
    static updateSanity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { character } = req.body;
            const { sanity, maxSanity } = character;
            const sheet = yield SheetController.sheetRepository.findOne({
                where: { id: Number(id) },
            });
            if (sheet) {
                sheet.sanity = sanity;
                sheet.maxSanity = maxSanity;
                yield SheetController.sheetRepository.save(sheet);
                return res.status(200).json(sheet);
            }
            return res.status(404).json({ message: 'Sheet not found' });
        });
    }
    static getSheetsBySocket() {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets = yield SheetController.sheetRepository.find();
            return sheets;
        });
    }
}
exports.SheetController = SheetController;
SheetController.sheetRepository = data_source_1.AppDataSource.getRepository(Sheet_1.Sheet);
