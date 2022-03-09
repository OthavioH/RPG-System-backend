import express, { Router } from 'express';

import { gameSettingsController } from '../controllers/GameSettingsController';
import { sheetController } from '../controllers/SheetController';

const routes = express.Router();

routes.get('/', (req,res)=>{
    return res.send('Olá');
});

routes.post('/gamesettings/create', gameSettingsController.createGameSettings);
routes.get('/gamesettings', gameSettingsController.getGameSettings);

routes.post('/gamesettings/properties/save', gameSettingsController.saveGameProperties);
routes.post('/gamesettings/timers/save', gameSettingsController.saveTimers);
routes.post('/gamesettings/roll/save', gameSettingsController.addNewRoll);

routes.post('/sheets/create', sheetController.createSheet);

routes.put('/sheets/:id/hp/update', sheetController.updateHp);
routes.put('/sheets/:id/sanity/update', sheetController.updateSanity);
routes.put('/sheets/:id/update', sheetController.updateOne);
routes.put('/sheets/:id/delete', sheetController.deleteById);

routes.get('/sheets/:id', sheetController.getSheetById);
routes.get('/sheets', sheetController.getAll);
export default routes;