/* eslint-disable @typescript-eslint/no-explicit-any */
import { GlobalConfigSql } from '../models/GlobalConfigSql';

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
