import { Router, Request, Response } from 'express';
import { scrapingIndexController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.get('/find', [], (req: Request, res: Response) => {
  scrapingIndexController.get(req, res);
});

route.get('/findQuery', [], (req: Request, res: Response) => {
  scrapingIndexController.findQuery(req, res);
});

export default route;
