import express, { Router } from 'express';

import { gameSettingsController } from '../controllers/GameSettingsController';
import { sheetController } from '../controllers/SheetController';

const routes = express.Router();

routes.get('/', (req,res)=>{
    return res.send('Olá');
});

routes.get('/gamesettings/create', gameSettingsController.createGameSettings);
routes.post('/gamesettings/save/properties', gameSettingsController.saveSkillsAndAttributes);
routes.post('/gamesettings/save/timers', gameSettingsController.saveTimers);
routes.get('/gamesettings', gameSettingsController.getGameSettings);

routes.get('/sheets/create', sheetController.createSheet);
routes.get('/sheets/:id', sheetController.getSheetById);
routes.get('/sheets/:id/status/update', sheetController.updateHpAndSanity);
routes.get('/sheets/:id/update', sheetController.updateOne);
routes.get('/sheets', sheetController.getAll);
export default routes;