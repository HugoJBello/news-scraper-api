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
