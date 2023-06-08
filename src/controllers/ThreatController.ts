import { AppDataSource } from "../config/data-source";
import { Threat } from "../entity/Threat";
import { generateRandomId } from "../utils/view_utils";
import { FastifyReply, FastifyRequest } from "fastify";

const healthPointsJson = JSON.stringify(
  require("../shared/threat_health_points.json")
);
export class ThreatController {
  private static threatRepository = AppDataSource.getRepository(Threat);

  constructor() {}

  static async createThreat(req: FastifyRequest, reply: FastifyReply) {
    const { threat: newThreat } = req.body as any;
    const threat = ThreatController.threatRepository.create({
      id: generateRandomId(),
      name: newThreat.name,
      vd: newThreat.vd,
      element: newThreat.element,
      healthPoints: healthPointsJson,
      secondElements: JSON.stringify(newThreat.secondElements),
      type: newThreat.type,
      size: newThreat.size,
    });

    await ThreatController.threatRepository.save(threat);
    threat.parseArrays();
    return reply.status(200).send(threat);
  }

  static async getThreats(req: FastifyRequest, reply: FastifyReply) {
    const threats = await ThreatController.threatRepository.find();

    threats.forEach((threat) => {
      threat.parseArrays();
    });

    return reply.status(200).send(threats);
  }

  static async getThreat(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const threat = await ThreatController.threatRepository.findOne({
      where: { id: id },
    });

    if (threat) {
      threat.parseArrays();
      return reply.status(200).send(threat);
    }
    return reply.status(404).send({ message: "Threat not found" });
  }

  static async updateThreat(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const { threat } = req.body as any;

    const oldThreat = await ThreatController.threatRepository.findOne({
      where: { id: id },
    });

    if (oldThreat) {
      oldThreat.updateData(threat);
      await ThreatController.threatRepository.save(oldThreat);
      oldThreat.parseArrays();
      return reply.status(200).send(oldThreat);
    }
    return reply.status(404).send({ message: "Threat not found" });
  }

  static async deleteThreat(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const threat = await ThreatController.threatRepository.findOne({
      where: { id: id },
    });

    if (threat) {
      await ThreatController.threatRepository.remove(threat);
      return reply.status(200).send({ message: "Threat deleted" });
    }
    return reply.status(404).send({ message: "Threat not found" });
  }
}
