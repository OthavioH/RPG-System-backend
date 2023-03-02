import { Socket } from "../config/socket";
import { Sheet } from "../entity/Sheet";

export class SocketController {

    socket:any;

    public initialize(server): void {
        Socket.initialize(server);
        this.socket = Socket.socket.on('connection', (socket) => {
            console.log("connected");
            socket.on('diceRoll', (timer) => {
                Socket.socket.emit('diceOnCooldown', timer);
            });
        });
    }

    public emitCharacterChanged(sheet: any): void {
        this.socket.emit('characterChanged', sheet);
    }

    public emitCharacterListChanged(sheet:Sheet, operation: string){
        this.socket.emit('editedCharacterList', {character:sheet, operation:operation});
    }
}