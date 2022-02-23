import express, { Router } from 'express';

import { gameSettingsController } from '../controllers/GameSettingsController';
import { sheetController } from '../controllers/SheetController';

const routes = express.Router();

routes.get('/', (req,res)=>{
    return res.send('Olá');
});

routes.get('/gamesettings/create', gameSettingsController.createGameSettings);
routes.get('/gamesettings', gameSettingsController.getGameSettings);

routes.post('/gamesettings/save/properties', gameSettingsController.saveGameProperties);
routes.post('/gamesettings/save/timers', gameSettingsController.saveTimers);

routes.post('/sheets/create', sheetController.createSheet);

routes.put('/sheets/:id/status/update', sheetController.updateHpAndSanity);
routes.put('/sheets/:id/update', sheetController.updateOne);
routes.put('/sheets/:id/delete', sheetController.deleteById);

routes.get('/sheets/:id', sheetController.getSheetById);
routes.get('/sheets', sheetController.getAll);
export default routes;