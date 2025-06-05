import { Router } from 'express';

import { getMenu } from '../controllers/menuController';
import { checkUserAuth } from '../middlewares/checkUserAuth';

const router = Router();

router.get('/menu', checkUserAuth, getMenu);

export default router;
