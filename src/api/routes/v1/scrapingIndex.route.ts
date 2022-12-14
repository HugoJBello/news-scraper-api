import { Router, Request, Response } from 'express';
import { scrapingIndexController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.get('/find/:newspaper', [], (req: Request, res: Response) => {
  scrapingIndexController.get(req, res);
});

route.get('/findQuery', [], (req: Request, res: Response) => {
  scrapingIndexController.findQuery(req, res);
});

route.post('/saveOrUpdate', [], (req: Request, res: Response) => {
  scrapingIndexController.saveOrUpdate(req, res);
});

export default route;
