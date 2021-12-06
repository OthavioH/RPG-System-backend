import express, { Router } from 'express';

import { gameSettingsController } from '../controllers/GameSettingsController';
import { sheetController } from '../controllers/SheetController';

const routes = express.Router();

routes.get('/', (req,res)=>{
    return res.send('Olá');
});

routes.get('/dashboard', gameSettingsController.getGameSettings);
routes.get('/dashboard/save', gameSettingsController.save);

routes.get('/sheets', sheetController.getAll);
routes.get('/sheets/:id', sheetController.getSheetById);
routes.get('/sheets/:id/update', sheetController.updateOne);
export default routes;