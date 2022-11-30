import { Request, Response } from 'express';
export declare class GameSettingsController {
    private static gameSettingsRepository;
    static createGameSettings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getGameSettings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateGameProperties(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static saveTimers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static addNewRoll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
