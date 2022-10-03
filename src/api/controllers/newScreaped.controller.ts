import { newsScrapedService } from '../services';
import { userValidation } from '../validations';
import { Request, Response } from 'express';
import Logger from '../lib/logger';
import { NewScrapedI } from '../models/NewScraped';
import * as moment from 'moment';

export async function get(req: Request, res: Response): Promise<void> {
  const params = req.query;
  if (params.id) {
    const id: string = params.id as string;
    const result = await newsScrapedService.findOne({ id }).catch((err) => {
      Logger.error(err);
      res.status(400);
    });
    res.status(200).send({
      success: true,
      payload: result
    });
  } else {
    res.status(403).send({ message: 'Validation failed' });
  }
}

//http://localhost:3000/api/v1/newScraped/findQuery?newspaper=eldiario.es&limit=6&orderByParam=createdAt&orderDirection=DESC
export const findQuery = async (req: Request, res: Response): Promise<void> => {
  const params = req.query;

  let orderByParam;
  if (params.orderByParam) {
    orderByParam = params.orderByParam;
    delete params.orderByParam;
  }

  //'DESC' or 'ASC'
  let orderDirection;

  if (params.orderDirection) {
    orderDirection = params.orderDirection;
    delete params.orderDirection;
  }

  let order;
  if (orderByParam && orderDirection) {
    order = [[orderByParam, orderDirection]];
  }

  let limit;
  if (params.limit) {
    limit = parseInt((params as any).limit) as number;
    delete params.limit;
  } else {
    limit = 100000;
  }

  let offset: number;
  if (params.offset) {
    offset = parseInt((params as any).offset) as number;
    delete params.offset;
  } else {
    offset = 0;
  }

  const query = params;
  console.log(query);

  try {
    const result = await newsScrapedService.findQuery(
      query,
      order,
      offset,
      limit
    );
    res.status(200).send({
      success: true,
      payload: result
    });
  } catch (e) {
    Logger.error(e);

    res.status(400).send({
      success: false,
      error: e
    });
  }
};

//http://localhost:3000/api/v1/newScraped/findNewsInDay?newspaper=eldiario.es&day=2022-10-03&orderCriteria=priority&daysInterval=2&scraperId=scraperTest
export const findNewsInDay = async (
  req: Request,
  res: Response
): Promise<void> => {
  const params = req.query;

  const day = moment.utc(params.day as string, 'YYYY-MM-DD').toDate();
  console.log('--------_', day);

  const newspaper = params.newspaper as string;
  const daysInterval = params.daysInterval as string;
  const orderCriteria = params.orderCriteria as string;
  const scraperId = params.scraperId as string | null | undefined;

  try {
    const result = await newsScrapedService.findNewsDay(
      newspaper,
      day,
      orderCriteria,
      daysInterval,
      scraperId
    );
    res.status(200).send({
      success: true,
      payload: result
    });
  } catch (e) {
    Logger.error(e);

    res.status(400).send({
      success: false,
      error: e
    });
  }
};

//http://localhost:3000/api/v1/newScraped/saveOrUpdate
export const saveOrUpdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const obj = req.body as NewScrapedI;

  try {
    const result = await newsScrapedService.saveOrUpdate(obj);
    res.status(200).send({
      success: true,
      payload: result
    });
  } catch (e) {
    Logger.error(e);

    res.status(400).send({
      success: false,
      error: e
    });
  }
};
