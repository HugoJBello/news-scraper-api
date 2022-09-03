import { Router, Request, Response } from 'express';
import { scrapingUrlController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.get('/find', [], (req: Request, res: Response) => {
  scrapingUrlController.get(req, res);
});

route.get('/findQuery', [], (req: Request, res: Response) => {
  scrapingUrlController.findQuery(req, res);
});

export default route;
