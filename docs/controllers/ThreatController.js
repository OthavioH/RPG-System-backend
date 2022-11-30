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
exports.ThreatController = void 0;
const data_source_1 = require("../config/data-source");
const Threat_1 = require("../entity/Threat");
const view_utils_1 = require("../utils/view_utils");
const healthPointsJson = JSON.stringify(require("../shared/threat_health_points.json"));
class ThreatController {
    constructor() { }
    static createThreat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { threat: newThreat } = req.body;
            const threat = ThreatController.threatRepository.create({
                id: (0, view_utils_1.generateRandomId)(),
                name: newThreat.name,
                vd: newThreat.vd,
                element: newThreat.element,
                healthPoints: healthPointsJson,
                secondElements: JSON.stringify(newThreat.secondElements),
                type: newThreat.type,
                size: newThreat.size,
            });
            yield ThreatController.threatRepository.save(threat);
            threat.parseArrays();
            return res.status(200).json(threat);
        });
    }
    static getThreats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const threats = yield ThreatController.threatRepository.find();
            threats.forEach((threat) => {
                threat.parseArrays();
            });
            return res.status(200).json(threats);
        });
    }
    static getThreat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const threat = yield ThreatController.threatRepository.findOne({
                where: { id: id },
            });
            if (threat) {
                threat.parseArrays();
                return res.status(200).json(threat);
            }
            return res.status(404).json({ message: "Threat not found" });
        });
    }
    static updateThreat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { threat } = req.body;
            const oldThreat = yield ThreatController.threatRepository.findOne({
                where: { id: id },
            });
            if (oldThreat) {
                oldThreat.updateData(threat);
                yield ThreatController.threatRepository.save(oldThreat);
                oldThreat.parseArrays();
                return res.status(200).json(oldThreat);
            }
            return res.status(404).json({ message: "Threat not found" });
        });
    }
    static deleteThreat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const threat = yield ThreatController.threatRepository.findOne({
                where: { id: id },
            });
            if (threat) {
                yield ThreatController.threatRepository.remove(threat);
                return res.status(200).json({ message: "Threat deleted" });
            }
            return res.status(404).json({ message: "Threat not found" });
        });
    }
}
exports.ThreatController = ThreatController;
ThreatController.threatRepository = data_source_1.AppDataSource.getRepository(Threat_1.Threat);
