import { Sequelize } from 'sequelize';

export const db = new Sequelize('rpg_system_firex','firexter','admin123',{dialect:'mysql',host:'db4free.net',port:3306});

