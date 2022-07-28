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
    profileImageUrl: {
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
    nex: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    rank:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    class:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    origin:{
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
    effortPoints:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    maxEffortPoints:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    proficiences:{
        type: Sequelize.STRING(999),
        defaultValue: '',
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
    rituals:{
        type: Sequelize.JSON,
        allowNull: true,
    },
    weapons: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    inventory: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    passiveDefense:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    blockDefense:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    dodgeDefense:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    physicsResistence:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    ballisticResistence:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    bloodResistence:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    energyResistence:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    deathResistence:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    knowledgeResistence:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    insanityResistence:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    },
    notes:{
        type: Sequelize.STRING(999),
        defaultValue: '',
    }
});