import { Server } from "socket.io";
export declare class Socket {
    static socket: Server;
    static initialize(server: any): void;
}
