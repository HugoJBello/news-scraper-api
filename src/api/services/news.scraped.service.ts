/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { newScrapedRepository } from '../repositories';
import { NewScrapedSql } from '../models/NewScrapedSql';

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
  console.log({ count, rows });
  return { count, rows };
};
