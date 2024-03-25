/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { scrapingIndex, newScrapedRepository } from '../repositories';
import { ScrapingIndexSql, convertScrapingIndexSqlIApi } from '../models/ScrapingIndexSql';
import { ScrapingIndexI } from '../models/ScrapingIndex';
import { NewScrapedI } from '../models/NewScraped';
import { convertScrapingNewsSqlIApi } from '../models/NewScrapedSql';
import { ResultsInNewspaper } from '../models/ResultsInNewspaper';

export const findResultsinNewspaper = async (params: { newspaper: string }): Promise<ResultsInNewspaper> => {
    try {
      const index = await scrapingIndex.findOne(params.newspaper);
      const convertedIndex = convertScrapingIndexSqlIApi(index)

      const idsList = convertedIndex.currentScrapingIdList
      console.log(idsList)

      const news =  await newScrapedRepository.findManyIds(idsList)
      const result = {} as ResultsInNewspaper

      const converted = news.map(item => convertScrapingNewsSqlIApi(item))
      result.scrapingIndex = convertedIndex
      result.news = converted

      return result
    } catch (err) {
      console.log(err);
      return {} as ResultsInNewspaper
    }
}
