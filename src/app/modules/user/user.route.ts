import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createUserZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  UserController.createFaculty
);
router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
