import { z } from 'zod';
import { bloodGroup } from '../../../constants/bloodGroup';
import { gender } from '../../../constants/gender';

// req- validation
// body-->object  (id,role,password)
//  data -->object

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const FacultyValidation = { updateFacultyZodSchema };
