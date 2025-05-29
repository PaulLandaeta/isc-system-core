import { Router } from 'express';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import * as userController from '../controllers/permissionController';
const router = Router();

router
    .route('/user/:id')
    .get(checkUserAuth, userController.getUserRolesAndPermissions);

export default router;
