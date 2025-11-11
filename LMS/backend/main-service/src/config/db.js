import 'dotenv/config';
import { Sequelize } from 'sequelize';
import fs from 'fs'
import path from 'path'


const logFilePath = path.join(process.cwd(), "sequelize-queries.log");
console.log("process.cwd()", process.cwd());


const logStream = fs.createWriteStream(logFilePath, { flags: "a" })


export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  benchmark: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    supportBigNumbers: true
  },
  logging: (sql, timing) => {
    const time = typeof timing === "number" ? timing : 0; // safe check
    const log = `[${new Date().toLocaleString()}] (${time} ms) ${sql}\n`;
    logStream.write(log);
  }
});
