import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
require("dotenv").config();

import { AppDataSource } from "./config/data-source";
import { SocketController } from "./controllers/SocketController";
import routes from "./routers/routes";

export const socketController = new SocketController();

const app = fastify({ logger: true });

AppDataSource.initialize().then(() => {
  app.register(fastifyCors, {
    origin: "*",
  });
  app.register(fastifyMultipart, { addToBody: true });
  app.register(fastifyStatic, {
    root: __dirname,
  });

  app.register(routes);

  const PORT = process.env.PORT || 3333;

  const start = async () => {
    try {
      await app.listen({ port: PORT as number, host: "0.0.0.0" }).then(() => {
        console.log(`Server started on port ${PORT}`);
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  socketController.initialize(app.server);

  start();
}).catch((error) => {
  console.error("Error starting server:", error);
});

export default app;
