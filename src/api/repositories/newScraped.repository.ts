import { NewScrapedI } from "../models/NewScraped";
import { NewScrapedSql } from "../models/NewScrapedSql";



export async function findOne(id:string): Promise<NewScrapedSql> {
  return await NewScrapedSql.findOne({where: {id:id}} as any)
}


export async function findQuery(query:any, order: any, offset: number, limit: number): Promise<{count:number, rows: NewScrapedSql[]}> {
  if (order){
    return  await NewScrapedSql.findAndCountAll({where: query, order, offset, limit} as any)
  } else {
    return  await NewScrapedSql.findAndCountAll({where: query, offset, limit} as any)
  }
}
