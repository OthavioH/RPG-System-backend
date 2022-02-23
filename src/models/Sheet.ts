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
    maxHp: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    sanity:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    maxSanity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    skills: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    attributes: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    weapons: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    equipments: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    notes:{
        type: Sequelize.STRING,
        defaultValue: '',
    }
});