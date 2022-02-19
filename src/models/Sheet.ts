import Sequelize from 'sequelize';

import { db } from '../config/db';

export const Sheet = db.define('sheet',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    playerName: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    age: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    gender: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    hp: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    occultismPoints:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    skills: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    attribute: {
        type: Sequelize.JSON,
        allowNull: true,
    }
});