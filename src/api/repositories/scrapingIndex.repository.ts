/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrapingIndexSql } from '../models/ScrapingIndexSql';

export async function findOne(id: string): Promise<ScrapingIndexSql> {
  return await ScrapingIndexSql.findOne({ where: { id: id } } as any);
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
