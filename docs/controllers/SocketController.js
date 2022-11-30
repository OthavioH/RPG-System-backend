"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketController = void 0;
const socket_1 = require("../config/socket");
class SocketController {
    initialize(server) {
        socket_1.Socket.initialize(server);
        this.socket = socket_1.Socket.socket.on('connection', (socket) => {
            console.log("connected");
            socket.on('diceRoll', (timer) => {
                socket_1.Socket.socket.emit('diceOnCooldown', timer);
            });
        });
    }
    emitCharacterChanged(sheet) {
        this.socket.emit('characterChanged', sheet);
    }
    emitCharacterListChanged(sheet, operation) {
        this.socket.emit('editedCharacterList', { character: sheet, operation: operation });
    }
}
exports.SocketController = SocketController;
