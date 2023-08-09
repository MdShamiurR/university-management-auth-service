import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdminZodSchema),
//   AdminController.updateAdmin
// );
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
//AuthController.getLogin
// router.get('/:id', AdminController.getSingleAdmin);
// router.get('/', AdminController.getAllAdmins);
// router.delete('/:id', AdminController.deleteAdmin);

export const AuthRoutes = router;
