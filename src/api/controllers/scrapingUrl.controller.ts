import { scrapingUrlService } from '../services';
import { userValidation } from '../validations';
import { Request, Response } from 'express';
import Logger from '../lib/logger';

export async function get(req: Request, res: Response): Promise<void> {
  const params = req.query;
  if (params.id) {
    const id: string = params.id as string;
    const result = await scrapingUrlService.findOne({ id }).catch((err) => {
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

//http://localhost:3000/api/v1/scrapingUrl/findQuery?newspaper=eldiario.es&limit=6&orderByParam=createdAt&orderDirection=DESC
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
    order = [orderByParam, orderDirection];
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

  try {
    const result = await scrapingUrlService.findQuery(
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
