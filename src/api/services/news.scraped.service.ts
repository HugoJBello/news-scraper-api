import {newScrapedRepository } from '../repositories';
import { NewScrapedSql } from '../models/NewScrapedSql';

export function findOne(params: { id: string }): Promise<NewScrapedSql> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(params)
      const news = await newScrapedRepository.findOne(params.id);
      console.log(news)
      resolve(news);
    } catch (err) {
      console.log(err)
      reject(err);
    }
  });
}
