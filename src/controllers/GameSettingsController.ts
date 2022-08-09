import { Request, Response } from 'express';
import { Socket } from '../config/socket';

import { GameSettings } from '../entity/GameSettings';
import { AppDataSource } from '../config/data-source';

export class GameSettingsController {
    private static gameSettingsRepository = AppDataSource.getRepository(GameSettings);

    static async createGameSettings(req: Request, res: Response) {

        const gameSettings = GameSettingsController.gameSettingsRepository.create({id:1});
        GameSettingsController.gameSettingsRepository.save(gameSettings);

        return res.status(200).json({
            diceScreenTime: gameSettings.diceScreenTime,
            diceCooldown: gameSettings.diceCooldown,
            lastRolls: JSON.parse(gameSettings.lastRolls),
            skills: JSON.parse(gameSettings.skills),  
            abilities: JSON.parse(gameSettings.abilities),
            rituals: JSON.parse(gameSettings.rituals),
        });
    }

    static async getGameSettings(req: Request, res: Response) {
        const gameSettings = await GameSettingsController.gameSettingsRepository.findOne({
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
    }

    static async updateGameProperties(req: Request, res: Response) {
        const { skills, abilities, rituals } = req.body;

        const gameSettings = await GameSettingsController.gameSettingsRepository.findOne({
            where: { id: 1 },
        });

        gameSettings.skills = JSON.stringify(skills);
        gameSettings.abilities = JSON.stringify(abilities);
        gameSettings.rituals = JSON.stringify(rituals);
        await GameSettingsController.gameSettingsRepository.save(gameSettings);
        
        return res.status(200).json({
            diceScreenTime: gameSettings.diceScreenTime,
            diceCooldown: gameSettings.diceCooldown,
            lastRolls: JSON.parse(gameSettings.lastRolls),
            skills: JSON.parse(gameSettings.skills),  
            abilities: JSON.parse(gameSettings.abilities),
            rituals: JSON.parse(gameSettings.rituals),
        });
    }

    static async saveTimers(req: Request, res: Response) {
        const { diceScreenTime, diceCooldown } = req.body;

        const gameSettings = await GameSettingsController.gameSettingsRepository.findOne({
            where: { id: 1 },
        });

        gameSettings.diceScreenTime = diceScreenTime;
        gameSettings.diceCooldown = diceCooldown;
        await GameSettingsController.gameSettingsRepository.save(gameSettings);
        
        return res.status(200).json({
            diceScreenTime: gameSettings.diceScreenTime,
            diceCooldown: gameSettings.diceCooldown,
            lastRolls: JSON.parse(gameSettings.lastRolls),
            skills: JSON.parse(gameSettings.skills),  
            abilities: JSON.parse(gameSettings.abilities),
            rituals: JSON.parse(gameSettings.rituals),
        });
    }

    static async addNewRoll(req: Request, res: Response) {
        const { roll, oldRollList } = req.body;
        const rollList: any[] = oldRollList;
        rollList.unshift(roll);
        if (rollList.length >= 11) {
            rollList.pop();
        }

        const actualRollList = rollList;

        const lastRollsJSON = JSON.stringify(actualRollList);

        const gameSettings = await GameSettingsController.gameSettingsRepository.findOne({
            where: { id: 1 },
        });

        if (gameSettings) {
            gameSettings.lastRolls = lastRollsJSON;
            await GameSettingsController.gameSettingsRepository.save(gameSettings);

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
    }
    
}
