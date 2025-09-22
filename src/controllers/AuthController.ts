import { AppDataSource } from "../config/data-source";
import { Threat } from "../entity/Threat";
import { User } from "../entity/User";
import { generateRandomId } from "../utils/view_utils";
import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from 'bcrypt';

export class AuthController {

    constructor() { }

    static async login(req: FastifyRequest<{ Body: { email: string; password: string; }; }>, reply: FastifyReply) {
        const { email, password } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        
        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return reply.status(401).send({ message: "Invalid password" });
        }

        user.password = undefined;

        return reply.status(200).send(user);
    }
}
