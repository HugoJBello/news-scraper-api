/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { globalConfigRepository } from '../repositories';
import {
  GlobalConfigSql,
  GlobalConfigSqlSqlI
} from '../models/GlobalConfigSql';

export function findOne(params: { id: string }): Promise<GlobalConfigSql> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(params);
      const news = await globalConfigRepository.findOne(params.id);
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
  const { count, rows } = await globalConfigRepository.findQuery(
    query,
    order,
    offset,
    limit
  );
  console.log({ count, rows });
  return { count, rows };
};

export const saveOrUpdate = async (global: GlobalConfigSqlSqlI) => {
  globalConfigRepository.saveOrUpdate(global);
};
