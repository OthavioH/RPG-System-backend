import { DataSource } from "typeorm";
import { Attribute } from "../entity/Attribute";
import { config } from "dotenv";

config();

const AppDataSource = new DataSource({
    type: "postgres", // ajuste para seu banco
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Attribute],
    synchronize: false,
});

async function seedAttributes() {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Attribute);
    const attributes = [
        "Força",
        "Inteligência",
        "Agilidade",
        "Vigor",
        "Presença"
    ];
    for (const name of attributes) {
        const exists = await repo.findOneBy({ name });
        if (!exists) {
            const attr = repo.create({ name });
            await repo.save(attr);
            console.log(`Atributo '${name}' criado.`);
        } else {
            console.log(`Atributo '${name}' já existe.`);
        }
    }
    await AppDataSource.destroy();
}

seedAttributes().then(() => process.exit(0));
