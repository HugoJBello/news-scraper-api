/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { globalConfig } from '../repositories';
import { GlobalConfigSql } from '../models/GlobalConfigSql';

export function findOne(params: { id: string }): Promise<GlobalConfigSql> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(params);
      const news = await globalConfig.findOne(params.id);
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
  const { count, rows } = await globalConfig.findQuery(
    query,
    order,
    offset,
    limit
  );
  console.log({ count, rows });
  return { count, rows };
};
