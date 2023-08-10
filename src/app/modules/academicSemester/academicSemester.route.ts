import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
); /* এই ভ্যালিডেশন শুধু টাইপ চেক করে যে,স্ট্রিং ,নাম্বর ঠিক মত দেয়া হয়ছে কিনা!  */
router.get('/:id', AcademicSemesterController.getSingleSemester);
//ensure 1: update-->make usure {title and code }both are given,neither in updateSchema
//ensure 2: at service: --> Mapping title: code
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.STUDENT),
  AcademicSemesterController.getAllSemesters
);

router.delete('/:id', AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoutes = router;
