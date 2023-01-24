/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { newScrapedRepository } from '../repositories';
import { convertScrapingNewsSqlIApi, NewScrapedSql } from '../models/NewScrapedSql';
import { NewScrapedI } from '../models/NewScraped';

export function findOne(params: { id: string }): Promise<NewScrapedSql> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(params);
      const news = await newScrapedRepository.findOne(params.id);
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
  const { count, rows } = await newScrapedRepository.findQuery(
    query,
    order,
    offset,
    limit
  );
  rows.map(item => convertScrapingNewsSqlIApi(item))

  console.log({ count, rows });
  return { count, rows };
};

export const saveOrUpdate = async (newScraped: NewScrapedI) => {
  newScrapedRepository.saveOrUpdate(newScraped);
};

export async function findNewsDay(
  newspaper: string,
  day: Date,
  order_criteria: string,
  daysInterval: string,
  scraperId: string | null | undefined
): Promise<{ count: number; rows: NewScrapedSql[] }> {
  return newScrapedRepository.findNewsDay(
    newspaper,
    day,
    order_criteria,
    daysInterval, 
    scraperId
  );
}
