import mysql from 'mysql2/promise';
import { DB_USERNAME, DB_PASSWORD } from './Consts.js';

function createDB() {
    let conn;

    mysql.createConnection({
        user: DB_USERNAME,
        password: DB_PASSWORD
    })
        .then(connection => {
            conn = connection;
            return connection.query("CREATE DATABASE IF NOT EXISTS examen");
        })
        .then(() => {
            return conn.end();
        })
        .catch(err => {
            console.log(err);
        });
}

export default createDB;