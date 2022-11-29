import { Request, Response } from 'express';
import { Sheet } from '../entity/Sheet';
export declare class SheetController {
    private static sheetRepository;
    constructor();
    static createSheet(req: Request, res: Response): Promise<void>;
    static getSheet(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateSheet(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteSheet(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllSheets(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateHp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateSanity(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getSheetsBySocket(): Promise<Sheet[]>;
}
