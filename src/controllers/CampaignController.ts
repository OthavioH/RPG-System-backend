import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../config/data-source";
import { Campaign } from "../entity/Campaign";
import { Sheet } from "../entity/Sheet";

export class CampaignController {
    private static campaignRepository = AppDataSource.getRepository(Campaign);

    static async createCampaign(req: FastifyRequest<{ Body: { title: string; masterId: string } }>, reply: FastifyReply) {
        const { title, masterId } = req.body;

        const campaign = CampaignController.campaignRepository.create({
            title,
            master: { id: masterId } as any,
        });

        await CampaignController.campaignRepository.save(campaign);
        return reply.status(201).send(campaign);
    }

    static async getUserCampaigns(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = req.params;

        const campaigns = await CampaignController.campaignRepository.find({
            where: { master: { id: id } },
        });

        return reply.status(200).send(campaigns);
    }

    static async deleteCampaign(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = req.params;

        const campaign = await CampaignController.campaignRepository.findOne({
            where: { id: id },
        });

        if (!campaign) {
            return reply.status(404).send({ message: "Campaign not found" });
        }

        await CampaignController.campaignRepository.remove(campaign);
        return reply.status(204).send();
    }

    static async getCampaignById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = req.params;

        const campaign = await CampaignController.campaignRepository.findOne({
            where: { id: id },
            select: {
                id: true,
                title: true,
                sheets: {
                    id: true,
                    name: true,
                    hp: true,
                    maxHp: true,
                    sanity: true,
                    maxSanity: true,
                },
                diceRolls: {
                    id: true,
                    diceResult: true,
                    diceFaces: true,
                    sheet: {
                        id: true,
                        name: true,
                    }
                }
            },
            relations: ['sheets', 'diceRolls']
        });

        if (!campaign) {
            return reply.status(404).send({ message: "Campaign not found" });
        }

        return reply.status(200).send(campaign);
    }
}