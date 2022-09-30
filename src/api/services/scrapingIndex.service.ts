/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { scrapingIndex } from '../repositories';
import { ScrapingIndexSql, convertScrapingIndexSqlIApi } from '../models/ScrapingIndexSql';
import { ScrapingIndexI } from '../models/ScrapingIndex';

export function findOne(params: { newspaper: string }): Promise<ScrapingIndexI> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(params);
      const index = await scrapingIndex.findOne(params.newspaper);
      const coverted = convertScrapingIndexSqlIApi(index)
      console.log(coverted);
      resolve(coverted);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

export const findQuery = async (
  query: any,
  order: any,
  offset: number,
  limit: number
) => {
  console.log(query, order);
  const { count, rows } = await scrapingIndex.findQuery(
    query,
    order,
    offset,
    limit
  );
  rows.map(index => convertScrapingIndexSqlIApi(index))
  console.log({ count, rows });
  return { count, rows };
};

export const saveOrUpdate = async (index: ScrapingIndexI) => {
  scrapingIndex.saveOrUpdate(index);
};
