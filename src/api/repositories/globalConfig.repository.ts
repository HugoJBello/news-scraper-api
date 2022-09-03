/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GlobalConfigSql,
  GlobalConfigSqlSqlI
} from '../models/GlobalConfigSql';

export async function findOne(id: string): Promise<GlobalConfigSql> {
  return await GlobalConfigSql.findOne({ where: { id: id } } as any);
}

export async function findQuery(
  query: unknown,
  order: unknown,
  offset: number,
  limit: number
): Promise<{ count: number; rows: GlobalConfigSql[] }> {
  if (order) {
    return await GlobalConfigSql.findAndCountAll({
      where: query,
      order,
      offset,
      limit
    } as any);
  } else {
    return await GlobalConfigSql.findAndCountAll({
      where: query,
      offset,
      limit
    } as any);
  }
}

export const saveOrUpdate = async (globalConfig: GlobalConfigSqlSqlI) => {
  const conditions = {
    scraperId: globalConfig.scraperId
  };
  try {
    const found = await GlobalConfigSql.findOne({ where: conditions });
    if (found) {
      await GlobalConfigSql.update(globalConfig, { where: conditions });
    } else {
      await GlobalConfigSql.create(globalConfig);
    }
  } catch (e) {
    console.log('error updating config');
    throw e;
  }
};
