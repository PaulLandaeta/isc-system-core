import { Router } from 'express';
import {
  getInternsByUserId,
  getInternsController,
  updateHoursController,
  getInternsById,
  getRecordInternsController,
  getInformationsInternController,
  getMyEventsInternController,
  getAllDataInternsControlller,
  createInternController,
} from '../controllers/internController';
import { checkUserAuth } from '../middlewares/checkUserAuth';

const router = Router();

router.route('/').get(checkUserAuth, getInternsController);
router.route('/').post(checkUserAuth, createInternController);
router.route('/full-info').get(checkUserAuth, getAllDataInternsControlller);
router.route('/:intern_id/update-hours').put(checkUserAuth, updateHoursController);
router.route('/:intern_id').get(checkUserAuth, getInternsById);
router.route('/:user_id/intern').get(checkUserAuth, getInternsByUserId);
router.route('/:intern_id/historial-eventos').get(checkUserAuth, getRecordInternsController);
router.route('/:intern_id/my-events').get(checkUserAuth, getMyEventsInternController);
router.route('/:intern_id/informacion').get(checkUserAuth, getInformationsInternController);

export default router;
