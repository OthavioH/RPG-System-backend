"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const socket_io_1 = require("socket.io");
class Socket {
    static initialize(server) {
        Socket.socket = new socket_io_1.Server(server, { cors: { origin: '*', methods: ["GET", "POST"] } });
    }
}
exports.Socket = Socket;
