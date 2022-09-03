/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrapingUrlsSql } from '../models/ScrapingUrlSql';

export async function findOne(id: string): Promise<ScrapingUrlsSql> {
  return await ScrapingUrlsSql.findOne({ where: { id: id } } as any);
}

export async function findQuery(
  query: unknown,
  order: unknown,
  offset: number,
  limit: number
): Promise<{ count: number; rows: ScrapingUrlsSql[] }> {
  if (order) {
    return await ScrapingUrlsSql.findAndCountAll({
      where: query,
      order,
      offset,
      limit
    } as any);
  } else {
    return await ScrapingUrlsSql.findAndCountAll({
      where: query,
      offset,
      limit
    } as any);
  }
}
