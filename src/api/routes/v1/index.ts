import { Router } from 'express';
import main from './main.route';
import user from './user.route';
import auth from './auth.route';
import newScraped from './newScraped.route';
import scrapingIndex from './scrapingIndex.route';
import scrapingUrl from './scrapingUrl.route';
import globalConfig from './globalConfig.route';
import resultsInNewspaper from './resultsInNewspaper.route';

const router: Router = Router();
router.use('/', main);
router.use('/auth', auth);
router.use('/user', user);
router.use('/newScraped', newScraped);
router.use('/scrapingIndex', scrapingIndex);
router.use('/scrapingUrl', scrapingUrl);
router.use('/globalConfig', globalConfig);
router.use('/resultsInNewspaper', resultsInNewspaper);

export default router;
