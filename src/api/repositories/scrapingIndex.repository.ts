/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrapingIndexI } from '../models/ScrapingIndex';
import {
  convertToScrapingIndexSqlI,
  obtainScrapingIUrlsSqlI,
  ScrapingIndexSql,
  ScrapingIndexSqlI
} from '../models/ScrapingIndexSql';
import { ScrapingUrlsSql } from '../models/ScrapingUrlSql';

export async function findOne(newspaper: string): Promise<ScrapingIndexSql> {
  return await ScrapingIndexSql.findOne({ where: { newspaper: newspaper } } as any);
}

export async function findQuery(
  query: unknown,
  order: unknown,
  offset: number,
  limit: number
): Promise<{ count: number; rows: ScrapingIndexSql[] }> {
  if (order) {
    return await ScrapingIndexSql.findAndCountAll({
      where: query,
      order,
      offset,
      limit
    } as any);
  } else {
    return await ScrapingIndexSql.findAndCountAll({
      where: query,
      offset,
      limit
    } as any);
  }
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function saveOrUpdate(index: ScrapingIndexI) {
  const indexDb = { ...index } as ScrapingIndexI;
  const conditions = {
    scraperId: indexDb.scraperId,
    newspaper: indexDb.newspaper
  };
  indexDb.dateScraping = new Date();

  const indexSql = convertToScrapingIndexSqlI(indexDb);

  const startingUrlsSql = obtainScrapingIUrlsSqlI(index);
  const found = await ScrapingIndexSql.findOne({ where: conditions });
  try {
    if (found) {
      await ScrapingIndexSql.update(indexSql, { where: conditions });
    } else {
      await ScrapingIndexSql.create(indexSql);
      for (const url of startingUrlsSql) {
        const foundUrl = await ScrapingUrlsSql.findOne({
          where: { url: url.url, newspaper: url.newspaper } as any
        });
        if (!foundUrl) {
          await ScrapingUrlsSql.create(url as any);
        }
      }
    }
  } catch (e) {
    console.log('ERROR UPDATING INDEX sqlite');
    throw e;
  }
}
