import { GameSettingsController } from "../controllers/GameSettingsController";
import { SheetController } from "../controllers/SheetController";
import { ThreatController } from "../controllers/ThreatController";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function routes(fastify, options) {
  fastify.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send("Olá");
  });

  fastify.get(
    "/gamesettings/create",
    GameSettingsController.createGameSettings
  );
  fastify.get("/gamesettings", GameSettingsController.getGameSettings);

  fastify.post(
    "/gamesettings/properties/save",
    GameSettingsController.updateGameProperties
  );
  fastify.post("/gamesettings/timers/save", GameSettingsController.saveTimers);
  fastify.post("/gamesettings/roll/save", GameSettingsController.addNewRoll);

  fastify.post("/sheets/create", SheetController.createSheet);

  fastify.put("/sheets/:id/hp/update", SheetController.updateHp);
  fastify.put("/sheets/:id/sanity/update", SheetController.updateSanity);
  fastify.put("/sheets/:id/update", SheetController.updateSheet);
  fastify.put("/sheets/:id/delete", SheetController.deleteSheet);

  fastify.get("/sheets/:id", SheetController.getSheet);
  fastify.get("/sheets", SheetController.getAllSheets);

  fastify.post("/threats/create", ThreatController.createThreat);
  fastify.put("/threats/:id/update", ThreatController.updateThreat);
  fastify.delete("/threats/:id/delete", ThreatController.deleteThreat);
  fastify.get("/threats/:id", ThreatController.getThreat);
  fastify.get("/threats", ThreatController.getThreats);
}
