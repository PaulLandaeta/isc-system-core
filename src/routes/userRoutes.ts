import { Router } from 'express';
import UserRole from '../constants/roles';
import * as userController from '../controllers/userController';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import { requireRole } from '../middlewares/checkUserRole';
import { validateBody } from '../middlewares/validateBodyMiddleware';
import { createAdminSchema } from '../middlewares/schemas/createUserSchema';

const router = Router();

router
    .route('/:id')
    .delete(
        checkUserAuth, 
        // TODO: Make it work with requireRole
        // requireRole([UserRole.ADMIN.name]),
        userController.deleteUser)

export default router;