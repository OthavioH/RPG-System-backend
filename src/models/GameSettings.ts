import Sequelize from 'sequelize';

import { db } from '../config/db';

export const GameSettings = db.define('gameSettings',{
    id:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    diceScreenTime: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
    },
    diceCooldown: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
    },
    lastRolls:{
        type:Sequelize.JSON,
        allowNull: true,
    },
    skills: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    attributes: {
        type: Sequelize.JSON,
        allowNull: true,
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