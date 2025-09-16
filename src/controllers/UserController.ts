import { AppDataSource } from "../config/data-source";
import { Threat } from "../entity/Threat";
import { User } from "../entity/User";
import { generateRandomId } from "../utils/view_utils";
import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from 'bcrypt';

export class UserController {
  private static userRepository = AppDataSource.getRepository(User);

  constructor() {}

  static async createUser(req: FastifyRequest<{Body: { name: string; email: string; password: string; }; }>, reply: FastifyReply) {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = UserController.userRepository.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await UserController.userRepository.save(user);
    return reply.status(201).send(user);
  }

  static async getUsers(req: FastifyRequest, reply: FastifyReply) {
    const users = await UserController.userRepository.find();

    return reply.status(200).send(users);
  }

  static async getUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const user = await UserController.userRepository.findOne({
      where: { id: id },
    });

    if (user) {
      return reply.status(200).send(user);
    }
    return reply.status(404).send({ message: "User not found" });
  }

  static async updateUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const { user } = req.body as any;

    const oldUser = await UserController.userRepository.findOne({
      where: { id: id },
    });

    if (oldUser) {
      await UserController.userRepository.save(user);
      return reply.status(200).send(user);
    }
    return reply.status(404).send({ message: "User not found" });
  }

  static async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const user = await UserController.userRepository.findOne({
      where: { id: id },
    });

    if (user) {
      await UserController.userRepository.remove(user);
      return reply.status(200).send({ message: "User deleted" });
    }
    return reply.status(404).send({ message: "User not found" });
  }
}
