import { Pool } from 'pg'
import * as dotenv from "dotenv"
dotenv.config({
    path: __dirname+'/.env'
})

const pool = new Pool({
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})


export default pool;