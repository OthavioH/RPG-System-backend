import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
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
    
    const server = http.createServer({
        
    },app);
    
    socketController.initialize(server);

    server.listen(8081, () => console.log(`Server started on port ${8081}`));
});