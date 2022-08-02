import Sequelize from 'sequelize';

import { db } from '../config/db';

const skillsJson = require('../shared/skills.json');
const abilitiesJson = require('../shared/abilities.json');
const ritualsJson = require('../shared/rituals.json');

export const GameSettings = db.define('gameSettings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    diceScreenTime: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
    },
    diceCooldown: {
        type: Sequelize.INTEGER,
        defaultValue: 4,
    },
    lastRolls: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    skills: {
        type: Sequelize.JSON,
        defaultValue: skillsJson
    },
    abilities: {
        type: Sequelize.JSON,
        defaultValue: abilitiesJson
    },
    rituals: {
        type: Sequelize.JSON,
        defaultValue: ritualsJson
    }
});