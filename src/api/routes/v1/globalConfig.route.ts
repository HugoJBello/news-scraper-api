import { Router, Request, Response } from 'express';
import { globalConfigController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.get('/find', [], (req: Request, res: Response) => {
  globalConfigController.get(req, res);
});

route.get('/findQuery', [], (req: Request, res: Response) => {
  globalConfigController.findQuery(req, res);
});

route.post('/saveOrUpdate', [], (req: Request, res: Response) => {
  globalConfigController.saveOrUpdate(req, res);
});

export default route;
