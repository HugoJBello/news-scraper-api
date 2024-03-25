import { Router, Request, Response } from 'express';
import { resultsInNewspaperController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.get('/find', [], (req: Request, res: Response) => {
  resultsInNewspaperController.get(req, res);
});

export default route;
