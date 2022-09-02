import { Router, Request, Response } from 'express';
import { newScrapedController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.get('/find', [], (req: Request, res: Response) => {
  newScrapedController.get(req, res);
}); 

route.get('/findQuery', [], (req: Request, res: Response) => {
  newScrapedController.findQuery(req, res);
}); 


export default route;
