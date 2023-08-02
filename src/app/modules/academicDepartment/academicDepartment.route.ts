import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  academicDepartmentController.createDepartment
);
router.get('/:id', academicDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  academicDepartmentController.updateAcademicDepartment
);
router.get('/', academicDepartmentController.getAllDepartment);
router.delete('/:id', academicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRoutes = router;
