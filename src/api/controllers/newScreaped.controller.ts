import { newsScrapedService } from '../services';
import { userValidation } from '../validations';
import { Request, Response } from 'express';
import Logger from '../lib/logger';

export async function get(req: Request, res: Response): Promise<void> {
  const params = req.query;
  if (params.id) {
    const id:string = params.id as string
    const result = await newsScrapedService.findOne({id}).catch((err) => {
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
