import express, { Router } from 'express';

import { GameSettingsController } from '../controllers/GameSettingsController';
import { SheetController } from '../controllers/SheetController';

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('Olá');
});

routes.get('/gamesettings/create', GameSettingsController.createGameSettings);
routes.get('/gamesettings', GameSettingsController.getGameSettings);

routes.post('/gamesettings/properties/save', GameSettingsController.updateGameProperties);
routes.post('/gamesettings/timers/save', GameSettingsController.saveTimers);
routes.post('/gamesettings/roll/save', GameSettingsController.addNewRoll);

routes.post('/sheets/create', SheetController.createSheet);

routes.put('/sheets/:id/hp/update', SheetController.updateHp);
routes.put('/sheets/:id/sanity/update', SheetController.updateSanity);
routes.put('/sheets/:id/update', SheetController.updateSheet);
routes.put('/sheets/:id/delete', SheetController.deleteSheet);

routes.get('/sheets/:id', SheetController.getSheet);
routes.get('/sheets', SheetController.getAllSheets);
export default routes;