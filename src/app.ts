import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';

import routes from './routers/routes';
import {db} from './config/db';

const app = express();

app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

db.sync();

app.use(routes);

const server = http.createServer(app);
const io = new Server(server, {cors: {origin: '*', methods:["GET", "POST"]}});

export const socket = io.on('connection',(socket)=>{
    console.log("connected");
    socket.on('diceRoll',(request:{timer:number,gameId:string})=>{
        io.emit('diceOnCooldown',{timer:request.timer,gameId:request.gameId});
    });
});

server.listen(process.env.PORT || 3333, ()=> console.log('Server started'));