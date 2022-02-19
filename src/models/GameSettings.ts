import { DataTypes } from 'sequelize';

import { db } from '../config/db';

export const GameSettings = db.define('gameSettings',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    diceScreenTime: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
    },
    diceCooldown: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
    },
    skills: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    attributes: {
        type: DataTypes.JSON,
        allowNull: true,
    }
});