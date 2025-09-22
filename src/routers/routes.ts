import { SheetController } from "../controllers/SheetController";
import { ThreatController } from "../controllers/ThreatController";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/UserController";
import { CampaignController } from "../controllers/CampaignController";
import { AuthController } from "../controllers/AuthController";

export default async function routes(fastify, options) {
  fastify.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send("Olá");
  });

  fastify.head("/ping", (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send("pong");
  });
  fastify.get("/ping", (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send("pong");
  });

  fastify.post("/users/create", UserController.createUser);
  fastify.post("/auth/login", AuthController.login);

  // fastify.get(
  //   "/gamesettings/create",
  //   GameSettingsController.createGameSettings
  // );
  // fastify.get("/gamesettings", GameSettingsController.getGameSettings);

  // fastify.post(
  //   "/gamesettings/properties/save",
  //   GameSettingsController.updateGameProperties
  // );
  // fastify.post("/gamesettings/timers/save", GameSettingsController.saveTimers);
  // fastify.post("/gamesettings/roll/save", GameSettingsController.addNewRoll);

  fastify.post("/sheets/create", SheetController.createSheet);

  fastify.put("/sheets/:id/hp/update", SheetController.updateHp);
  fastify.put("/sheets/:id/sanity/update", SheetController.updateSanity);
  fastify.put("/sheets/:id/update", SheetController.updateSheet);
  fastify.delete("/sheets/:id", SheetController.deleteSheet);

  fastify.get("/sheets/:id", SheetController.getSheet);
  fastify.get("/sheets", SheetController.getAllSheets);

  fastify.post("/threats/create", ThreatController.createThreat);
  fastify.put("/threats/:id/update", ThreatController.updateThreat);
  fastify.delete("/threats/:id/delete", ThreatController.deleteThreat);
  fastify.get("/threats/:id", ThreatController.getThreat);
  fastify.get("/threats", ThreatController.getThreats);

  fastify.post("/campaigns", CampaignController.createCampaign);
  fastify.get("/campaigns/read-by-user/:id", CampaignController.getUserCampaigns);
  fastify.get("/campaigns/:id", CampaignController.getCampaignById);
  fastify.delete("/campaigns/:id", CampaignController.deleteCampaign);
}
