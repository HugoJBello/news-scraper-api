import { Router } from 'express';
import main from './main.route';
import user from './user.route';
import auth from './auth.route';
import newScraped from './newScraped.route';

const router: Router = Router();
router.use('/', main);
router.use('/auth', auth);
router.use('/user', user);
router.use("/newScraped", newScraped);

export default router;
