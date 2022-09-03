/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { scrapingIndex } from '../repositories';
import { ScrapingIndexSql } from '../models/ScrapingIndexSql';

export function findOne(params: { id: string }): Promise<ScrapingIndexSql> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(params);
      const news = await scrapingIndex.findOne(params.id);
      console.log(news);
      resolve(news);
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
  console.log({ count, rows });
  return { count, rows };
};
