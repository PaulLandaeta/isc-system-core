import { Router } from 'express';

import {login, mePermissions} from '../controllers/authController';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import { loginSchema } from '../middlewares/schemas/loginSchema';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import { validateParams } from '../middlewares/validateParamsMiddleware';
import { paramIdSchema } from '../middlewares/schemas/paramIdSchema';

const router = Router();

router.route('/login').post(validateBody(loginSchema), login);

router.route('/mePermissions/:id').get(checkUserAuth, validateParams(paramIdSchema), mePermissions)

export default router;
