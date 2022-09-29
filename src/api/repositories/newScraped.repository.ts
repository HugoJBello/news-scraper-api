/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment = require('moment');
import { Op } from 'sequelize';
import { NewScrapedI } from '../models/NewScraped';
import {
  convertToNewsScrapedSqlI,
  NewScrapedSql
} from '../models/NewScrapedSql';

export async function findOne(id: string): Promise<NewScrapedSql> {
  return await NewScrapedSql.findOne({ where: { id: id } } as any);
}

export async function findQuery(
  query: unknown,
  order: unknown,
  offset: number,
  limit: number
): Promise<{ count: number; rows: NewScrapedSql[] }> {
  if (order) {
    return await NewScrapedSql.findAndCountAll({
      where: query,
      order,
      offset,
      limit
    } as any);
  } else {
    return await NewScrapedSql.findAndCountAll({
      where: query,
      offset,
      limit
    } as any);
  }
}

export async function findNewsDay(
  newspaper: string,
  day: Date,
  orderCriteria: string,
  daysInterval: string
): Promise<{ count: number; rows: NewScrapedSql[] }> {
  const endDate = day as any;
  //endDate = moment(endDate).format('YYYY-MM-DD').split(" ")[0];
  const daysIntervalInt = parseInt(daysInterval);
  console.log('-----', daysInterval);

  let startDate = new Date(endDate.getTime()) as any;
  startDate = new Date(
    startDate.setDate(startDate.getDate() - daysIntervalInt)
  );
  //startDate = moment(startDate).format('YYYY-MM-DD').split(" ")[0];
  const query = {
    newspaper: newspaper,
    date: {
      [Op.lt]: endDate,
      [Op.gt]: startDate
    }
  };

  let order = [];

  if (orderCriteria == 'priority') {
    order = [['newsIndex', 'ASC']];
  } else {
    order = [['date', 'DESC']];
  }

  return await NewScrapedSql.findAndCountAll({
    where: query,
    order
  } as any);
}

export const cleanUpForSaving = (newItem: NewScrapedI) => {
  if (!newItem.id || newItem.id == null) newItem.id = 'error';
  if (!newItem.url || newItem.url == null) newItem.url = '';
  return newItem;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function saveOrUpdate(newItem: NewScrapedI) {
  if (!newItem.content || newItem.content == '' || newItem.content == null) {
    console.log('News not saved because does not have content', newItem);
    return;
  }

  const conditions = { url: newItem.url || '' };
  if (newItem.url) {
    newItem = cleanUpForSaving(newItem);
    try {
      const newsSql = convertToNewsScrapedSqlI(newItem);
      const found = await NewScrapedSql.findOne({ where: conditions });
      if (found) {
        await NewScrapedSql.update(newsSql, { where: conditions });
      } else {
        await NewScrapedSql.create(newsSql);
      }
    } catch (e) {
      console.log('ERROR SAVING sqlite');
      throw e;
    }
  }
}
