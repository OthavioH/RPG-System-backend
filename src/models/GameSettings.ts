import Sequelize from 'sequelize';

import { db } from '../config/db';

const skillsJson = require('../shared/skills.json');

export const GameSettings = db.define('gameSettings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    diceScreenTime: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
    },
    diceCooldown: {
        type: Sequelize.INTEGER,
        defaultValue: 8,
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
        allowNull: true,
    },
    rituals: {
        type: Sequelize.JSON,
        allowNull: true,
    }
});