import { Sequelize } from 'sequelize';
import {
  GlobalConfigSql,
  globalConfigSqlAttributes
} from '../api/models/GlobalConfigSql';
import {
  NewScrapedSql,
  newScrapedSqlAttributes
} from '../api/models/NewScrapedSql';
import {
  ScrapingIndexSql,
  scrapingIndexSqlAttributes
} from '../api/models/ScrapingIndexSql';
import {
  scrapingUrlSqlAttributes,
  ScrapingUrlsSql
} from '../api/models/ScrapingUrlSql';
import Logger from '../api/lib/logger';

function customLog(msg: string) {
  Logger.debug(msg);
}

const path = require('path');
const dbPath = path.resolve(__dirname, 'database_news.sqlite3')

export let database: any = null

if (process.env.DB_TYPE == "mysql") {
    database = new Sequelize(
        process.env.DB_NAME as string,
        process.env.DB_USER as string,
        process.env.DB_PASS as string,
        {
            host: process.env.DB_HOST as string,
            dialect: 'mysql'
        }
    );
    console.log("Using mysql db")
} else {
    database = new Sequelize({
        storage: dbPath,
        dialect: 'sqlite'
    });
    console.log("Using sqlite db")
}
export const db = database;

export default async function syncDB(): Promise<Sequelize> {
  await initDb();
  return await db.sync();
}

export const initDb = async () => {
  NewScrapedSql.init(newScrapedSqlAttributes, {
    tableName: 'NewScraped',
    sequelize: db // this bit is important
  });

  ScrapingIndexSql.init(scrapingIndexSqlAttributes, {
    tableName: 'ScrapingIndex',
    sequelize: db // this bit is important
  });

  ScrapingUrlsSql.init(scrapingUrlSqlAttributes as any, {
    tableName: 'ScrapingUrl',
    sequelize: db // this bit is important
  });

  GlobalConfigSql.init(globalConfigSqlAttributes, {
    tableName: 'GlobalConfig',
    sequelize: db // this bit is important
  });

  await NewScrapedSql.sync({ force: false });
  await ScrapingIndexSql.sync({ force: false });
  await ScrapingUrlsSql.sync({ force: false });
  await GlobalConfigSql.sync({ force: false });
};
