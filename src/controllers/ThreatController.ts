import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Threat } from "../entity/Threat";
import { generateRandomId } from "../shared/view_utils";

const healthPointsJson = JSON.stringify(
  require("../shared/threat_health_points.json")
);
export class ThreatController {
  private static threatRepository = AppDataSource.getRepository(Threat);

  constructor() {}

  static async createThreat(req: Request, res: Response) {
    const { threat: newThreat } = req.body;
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
    return res.status(200).json(threat);
  }

  static async getThreats(req: Request, res: Response) {
    const threats = await ThreatController.threatRepository.find();

    threats.forEach((threat) => {
      threat.parseArrays();
    });

    return res.status(200).json(threats);
  }

  static async getThreat(req: Request, res: Response) {
    const { id } = req.params;
    const threat = await ThreatController.threatRepository.findOne({
      where: { id: id },
    });

    if (threat) {
      threat.parseArrays();
      return res.status(200).json(threat);
    }
    return res.status(404).json({ message: "Threat not found" });
  }

  static async updateThreat(req: Request, res: Response) {
    const { id } = req.params;
    const { threat } = req.body;

    const oldThreat = await ThreatController.threatRepository.findOne({
      where: { id: id },
    });

    if (oldThreat) {
      oldThreat.updateData(threat);
      await ThreatController.threatRepository.save(oldThreat);
      oldThreat.parseArrays();
      return res.status(200).json(oldThreat);
    }
    return res.status(404).json({ message: "Threat not found" });
  }

  static async deleteThreat(req: Request, res: Response) {
    const { id } = req.params;
    const threat = await ThreatController.threatRepository.findOne({
      where: { id: id },
    });

    if (threat) {
      await ThreatController.threatRepository.remove(threat);
      return res.status(200).json({ message: "Threat deleted" });
    }
    return res.status(404).json({ message: "Threat not found" });
  }
}
