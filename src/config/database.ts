import { Sequelize } from 'sequelize';
import Logger from '../api/lib/logger';

function customLog(msg: string) {
  Logger.debug(msg);
}
export const db =  new Sequelize({
  storage: './new.sqlite3',
  dialect: 'sqlite',
})

export default async function syncDB(): Promise<Sequelize> {
  return await db.sync();
}
