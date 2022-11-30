import { Sheet } from "../entity/Sheet";
export declare class SocketController {
    socket: any;
    initialize(server: any): void;
    emitCharacterChanged(sheet: any): void;
    emitCharacterListChanged(sheet: Sheet, operation: string): void;
}
