import { GameSettings } from "../entity/GameSettings";
import { AppDataSource } from "../config/data-source";
import { FastifyReply, FastifyRequest } from "fastify";

export class GameSettingsController {
  private static gameSettingsRepository =
    AppDataSource.getRepository(GameSettings);

  static async createGameSettings(req: FastifyRequest, reply: FastifyReply) {
    const gameSettings = GameSettingsController.gameSettingsRepository.create({
      id: 1,
    });
    GameSettingsController.gameSettingsRepository.save(gameSettings);

    return reply.status(200).send({
      diceScreenTime: gameSettings.diceScreenTime,
      diceCooldown: gameSettings.diceCooldown,
      lastRolls: JSON.parse(gameSettings.lastRolls),
      skills: JSON.parse(gameSettings.skills),
      abilities: JSON.parse(gameSettings.abilities),
      rituals: JSON.parse(gameSettings.rituals),
    });
  }

  static async getGameSettings(req: FastifyRequest, reply: FastifyReply) {
    let gameSettings: GameSettings =
      await GameSettingsController.gameSettingsRepository.findOne({
        where: { id: 1 },
      });

    if (!gameSettings) {
      // if gameSettings doesn't exist, create it
      gameSettings = GameSettingsController.gameSettingsRepository.create({
        id: 1,
      });
      GameSettingsController.gameSettingsRepository.save(gameSettings);
    }

    return reply.status(200).send({
      diceScreenTime: gameSettings.diceScreenTime,
      diceCooldown: gameSettings.diceCooldown,
      lastRolls: JSON.parse(gameSettings.lastRolls),
      skills: JSON.parse(gameSettings.skills),
      abilities: JSON.parse(gameSettings.abilities),
      rituals: JSON.parse(gameSettings.rituals),
    });
  }

  static async updateGameProperties(req: FastifyRequest, reply: FastifyReply) {
    const { skills, abilities, rituals } = req.body as any;

    const gameSettings =
      await GameSettingsController.gameSettingsRepository.findOne({
        where: { id: 1 },
      });

    gameSettings.skills = JSON.stringify(skills);
    gameSettings.abilities = JSON.stringify(abilities);
    gameSettings.rituals = JSON.stringify(rituals);
    await GameSettingsController.gameSettingsRepository.save(gameSettings);

    return reply.status(200).send({
      diceScreenTime: gameSettings.diceScreenTime,
      diceCooldown: gameSettings.diceCooldown,
      lastRolls: JSON.parse(gameSettings.lastRolls),
      skills: JSON.parse(gameSettings.skills),
      abilities: JSON.parse(gameSettings.abilities),
      rituals: JSON.parse(gameSettings.rituals),
    });
  }

  static async saveTimers(req: FastifyRequest, reply: FastifyReply) {
    const { diceScreenTime, diceCooldown } = req.body as any;

    const gameSettings =
      await GameSettingsController.gameSettingsRepository.findOne({
        where: { id: 1 },
      });

    gameSettings.diceScreenTime = diceScreenTime;
    gameSettings.diceCooldown = diceCooldown;
    await GameSettingsController.gameSettingsRepository.save(gameSettings);

    return reply.status(200).send({
      diceScreenTime: gameSettings.diceScreenTime,
      diceCooldown: gameSettings.diceCooldown,
      lastRolls: JSON.parse(gameSettings.lastRolls),
      skills: JSON.parse(gameSettings.skills),
      abilities: JSON.parse(gameSettings.abilities),
      rituals: JSON.parse(gameSettings.rituals),
    });
  }

  static async addNewRoll(req: FastifyRequest, reply: FastifyReply) {
    const { roll, oldRollList } = req.body as any;
    const rollList: any[] = oldRollList;
    rollList.unshift(roll);
    if (rollList.length >= 11) {
      rollList.pop();
    }

    const actualRollList = rollList;

    const lastRollsJSON = JSON.stringify(actualRollList);

    const gameSettings =
      await GameSettingsController.gameSettingsRepository.findOne({
        where: { id: 1 },
      });

    if (gameSettings) {
      gameSettings.lastRolls = lastRollsJSON;
      await GameSettingsController.gameSettingsRepository.save(gameSettings);

      // Socket.socket.emit('lastRollListChanged', actualRollList);

      return reply.status(200).send({
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
