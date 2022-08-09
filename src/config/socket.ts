import { Server } from "socket.io";

export class Socket {

    static socket: Server;

    static initialize(server):void {
        Socket.socket =  new Server(server, { cors: { origin: '*', methods: ["GET", "POST"] } });
    }
}
