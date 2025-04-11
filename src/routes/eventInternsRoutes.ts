import { Router } from 'express';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import {
  deleteRegistrationController,
  getEventInternsController,
  registerInternController,
  updateInternType,
  updateEventHistoryController,
  updateAttendanceController,
  getEventInformationsController,
  updateEventInternController,
  getEventInternController,
} from '../controllers/eventInternsController';

const router = Router();

router.route('/:id_evento/register').post(checkUserAuth, registerInternController);
router.route('/:id_evento/registrations').get(checkUserAuth, getEventInternsController);
router.route('/:id_evento/update-status/:id_becario').put(checkUserAuth, updateInternType);
router
  .route('/:id_evento/registrations/:id_becario')
  .delete(checkUserAuth, deleteRegistrationController);
router.route('/:id_evento/actualizar-eventos').put(checkUserAuth, updateEventHistoryController);
//TODO: refactor to use only generic update route
router.route('/:id_evento/update/:id_becario').put(checkUserAuth, updateEventInternController);
router
  .route('/:id_evento/confirm_attendance/:id_becario')
  .put(checkUserAuth, updateAttendanceController);
router.route('/register-information').get(checkUserAuth, getEventInformationsController);
router.route('/:id_evento/status/:id_becario').get(checkUserAuth, getEventInternController)
export default router;
