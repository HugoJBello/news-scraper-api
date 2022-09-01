import { NewScrapedI } from "../models/NewScraped";
import { NewScrapedSql } from "../models/NewScrapedSql";


export async function findOne(id:string): Promise<NewScrapedSql> {
  return await NewScrapedSql.findOne({where: {id:id}} as any)
}
