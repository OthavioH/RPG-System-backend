import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import https from 'https';
import path from 'path';
import fs from 'fs';

import routes from './routers/routes';
import { AppDataSource } from './config/data-source';
import { SocketController } from './controllers/SocketController';

export const socketController = new SocketController();

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(cors({ origin: '*' }));
    app.use(express.json({ limit: '500mb' }));
    app.use(express.urlencoded({ extended: true, limit: '500mb' }));
    app.use(morgan('dev'));
    
    app.use(routes);
    
    const server = https.createServer({
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },app);
    
    socketController.initialize(server);

    server.listen(process.env.PORT || 3000, () => console.log(`Server started on port ${process.env.PORT || 3000}`));
});