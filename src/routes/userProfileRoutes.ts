import { Router } from 'express';

import * as UserProfileController from '../controllers/userProfileController';
import { checkUserAuth } from '../middlewares/checkUserAuth';

const router = Router();

router.route('/:id').delete(
  checkUserAuth,
  // TODO: Make it work with requireRole
  // requireRole([UserRole.ADMIN.name]),
  UserProfileController.deleteUser
);
router.route('/').get(checkUserAuth, UserProfileController.getAllUsers);
router.route('/:id').get(checkUserAuth, UserProfileController.getUser);
router.route('/').post(checkUserAuth, UserProfileController.createUser);
router.route('/:id').put(checkUserAuth, UserProfileController.updateUser);
router.get('/profile/:id', checkUserAuth, UserProfileController.getPublicProfileById);
export default router;
