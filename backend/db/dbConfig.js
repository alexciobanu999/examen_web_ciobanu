import Sequelize from 'sequelize';
// import { DB_USERNAME, DB_PASSWORD } from './Consts.js';

// const db = new Sequelize({
//     dialect: 'mysql',
//     database: 'examen',
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     logging: false,
//     define: {
//         timestamps: false,
//         freezeTableName: true
//     }
// })

const db = new Sequelize(
    process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

export default db;