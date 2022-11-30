import { Request, Response } from "express";
export declare class ThreatController {
    private static threatRepository;
    constructor();
    static createThreat(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getThreats(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getThreat(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateThreat(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteThreat(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
