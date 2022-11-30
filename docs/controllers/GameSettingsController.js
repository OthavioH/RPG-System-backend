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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSettingsController = void 0;
const GameSettings_1 = require("../entity/GameSettings");
const data_source_1 = require("../config/data-source");
class GameSettingsController {
    static createGameSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameSettings = GameSettingsController.gameSettingsRepository.create({ id: 1 });
            GameSettingsController.gameSettingsRepository.save(gameSettings);
            return res.status(200).json({
                diceScreenTime: gameSettings.diceScreenTime,
                diceCooldown: gameSettings.diceCooldown,
                lastRolls: JSON.parse(gameSettings.lastRolls),
                skills: JSON.parse(gameSettings.skills),
                abilities: JSON.parse(gameSettings.abilities),
                rituals: JSON.parse(gameSettings.rituals),
            });
        });
    }
    static getGameSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameSettings = yield GameSettingsController.gameSettingsRepository.findOne({
                where: { id: 1 },
            });
            if (gameSettings) {
                return res.status(200).json({
                    diceScreenTime: gameSettings.diceScreenTime,
                    diceCooldown: gameSettings.diceCooldown,
                    lastRolls: JSON.parse(gameSettings.lastRolls),
                    skills: JSON.parse(gameSettings.skills),
                    abilities: JSON.parse(gameSettings.abilities),
                    rituals: JSON.parse(gameSettings.rituals),
                });
            }
            return res.status(404).json({ message: 'Game settings not found' });
        });
    }
    static updateGameProperties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skills, abilities, rituals } = req.body;
            const gameSettings = yield GameSettingsController.gameSettingsRepository.findOne({
                where: { id: 1 },
            });
            gameSettings.skills = JSON.stringify(skills);
            gameSettings.abilities = JSON.stringify(abilities);
            gameSettings.rituals = JSON.stringify(rituals);
            yield GameSettingsController.gameSettingsRepository.save(gameSettings);
            return res.status(200).json({
                diceScreenTime: gameSettings.diceScreenTime,
                diceCooldown: gameSettings.diceCooldown,
                lastRolls: JSON.parse(gameSettings.lastRolls),
                skills: JSON.parse(gameSettings.skills),
                abilities: JSON.parse(gameSettings.abilities),
                rituals: JSON.parse(gameSettings.rituals),
            });
        });
    }
    static saveTimers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { diceScreenTime, diceCooldown } = req.body;
            const gameSettings = yield GameSettingsController.gameSettingsRepository.findOne({
                where: { id: 1 },
            });
            gameSettings.diceScreenTime = diceScreenTime;
            gameSettings.diceCooldown = diceCooldown;
            yield GameSettingsController.gameSettingsRepository.save(gameSettings);
            return res.status(200).json({
                diceScreenTime: gameSettings.diceScreenTime,
                diceCooldown: gameSettings.diceCooldown,
                lastRolls: JSON.parse(gameSettings.lastRolls),
                skills: JSON.parse(gameSettings.skills),
                abilities: JSON.parse(gameSettings.abilities),
                rituals: JSON.parse(gameSettings.rituals),
            });
        });
    }
    static addNewRoll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roll, oldRollList } = req.body;
            const rollList = oldRollList;
            rollList.unshift(roll);
            if (rollList.length >= 11) {
                rollList.pop();
            }
            const actualRollList = rollList;
            const lastRollsJSON = JSON.stringify(actualRollList);
            const gameSettings = yield GameSettingsController.gameSettingsRepository.findOne({
                where: { id: 1 },
            });
            if (gameSettings) {
                gameSettings.lastRolls = lastRollsJSON;
                yield GameSettingsController.gameSettingsRepository.save(gameSettings);
                // Socket.socket.emit('lastRollListChanged', actualRollList);
                return res.status(200).json({
                    diceScreenTime: gameSettings.diceScreenTime,
                    diceCooldown: gameSettings.diceCooldown,
                    lastRolls: JSON.parse(gameSettings.lastRolls),
                    skills: JSON.parse(gameSettings.skills),
                    abilities: JSON.parse(gameSettings.abilities),
                    rituals: JSON.parse(gameSettings.rituals),
                });
            }
        });
    }
}
exports.GameSettingsController = GameSettingsController;
GameSettingsController.gameSettingsRepository = data_source_1.AppDataSource.getRepository(GameSettings_1.GameSettings);
