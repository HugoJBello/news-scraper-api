import { resultsInNewspaperService } from '../services';
import { userValidation } from '../validations';
import { Request, Response } from 'express';
import Logger from '../lib/logger';
import { NewScrapedI } from '../models/NewScraped';
import { ScrapingConfigI } from '../models/ScrapingConfig';
import { ScrapingIndexI } from '../models/ScrapingIndex';

//http://localhost:3000/api/v1/resultsInNewspaper/find/eldiario.es
export async function get(req: Request, res: Response): Promise<void> {
  const params = req.query;
  if (params.id) {
    const newspaper: string = params.newspaper as string;
    const result = await resultsInNewspaperService.findOne({ newspaper }).catch((err) => {
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
