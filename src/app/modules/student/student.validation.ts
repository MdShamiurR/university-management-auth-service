import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

// req- validation
// body-->object  (id,role,password)
//  data -->object

const updateStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
        middleName: z.string().optional(),
        lastName: z
          .string({
            required_error: 'Last Name is required',
          })
          .optional(),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is Required',
        })
        .optional(),
      gender: z
        .enum([...gender] as [string, ...string[]], {
          required_error: 'Gender is Required',
        })
        .optional(),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is Required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is Required',
        })
        .email()
        .optional(),
      contactNo: z
        .string({
          required_error: 'ContactNo is Required',
        })
        .optional(),
      emergencyContactNo: z
        .string({
          required_error: 'Emergency ContactNo is Required',
        })
        .optional(),
      presentAddress: z
        .string({
          required_error: 'Present Address ContactNo is Required',
        })
        .optional(),
      permanentAddress: z
        .string({
          required_error: 'Permanent Address ContactNo is Required',
        })
        .optional(),
      academicFaculty: z
        .string({
          required_error: 'Academic Faculty is Required',
        })
        .optional(),
      academicDepartment: z
        .string({
          required_error: 'Academic Department is Required',
        })
        .optional(),
      academicSemester: z
        .string({
          required_error: 'Academic Semester is Required',
        })
        .optional(),
      guardian: z.object({
        fatherName: z
          .string({
            required_error: 'Father name is required',
          })
          .optional(),
        fatherOccupation: z
          .string({
            required_error: 'father Occupation is required',
          })
          .optional(),
        fatherContactNo: z
          .string({
            required_error: 'Father ContactNo is required',
          })
          .optional(),
        motherName: z
          .string({
            required_error: 'Mother Name is required',
          })
          .optional(),
        motherOccupation: z
          .string({
            required_error: 'Mother Occupation is required',
          })
          .optional(),
        motherContactNo: z
          .string({
            required_error: 'Mother ContactNo is required',
          })
          .optional(),
        address: z
          .string({
            required_error: 'Address is required',
          })
          .optional(),
      }),
      localGuardian: z.object({
        name: z
          .string({
            required_error: 'Local Guardian name is required',
          })
          .optional(),
        occupation: z
          .string({
            required_error: 'Local Guardian occupation is required',
          })
          .optional(),
        contactNo: z
          .string({
            required_error: 'Local Guardian contactNo is required',
          })
          .optional(),
        address: z
          .string({
            required_error: 'Local Guardian address is required',
          })
          .optional(),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const StudentValidation = { updateStudentZodSchema };
