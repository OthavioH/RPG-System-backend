import express, { Router } from 'express';

import { gameSettingsController } from '../controllers/GameSettingsController';
import { sheetController } from '../controllers/SheetController';

const routes = express.Router();

routes.get('/', (req,res)=>{
    return res.send('Olá');
});

routes.post('/gamesettings/create', gameSettingsController.createGameSettings);
routes.post('/gamesettings/save/properties', gameSettingsController.saveSkillsAndAttributes);
routes.post('/gamesettings/save/timers', gameSettingsController.saveTimers);
routes.get('/gamesettings', gameSettingsController.getGameSettings);

routes.post('/sheets/create', sheetController.createSheet);
routes.put('/sheets/:id/status/update', sheetController.updateHpAndSanity);
routes.put('/sheets/:id/update', sheetController.updateOne);
routes.put('/sheets/:id/delete', sheetController.deleteById);
routes.get('/sheets/:id', sheetController.getSheetById);
routes.get('/sheets', sheetController.getAll);
export default routes;