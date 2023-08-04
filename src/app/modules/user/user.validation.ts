import { z } from 'zod';
import { bloodGroup } from '../../../constants/bloodGroup';
import { gender } from '../../../constants/gender';

// req- validation
// body-->object  (id,role,password)
//  data -->object

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is Required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is Required',
      }),
      email: z
        .string({
          required_error: 'Email is Required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'ContactNo is Required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency ContactNo is Required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address ContactNo is Required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address ContactNo is Required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is Required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is Required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is Required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'father Occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father ContactNo is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother ContactNo is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local Guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local Guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian contactNo is required',
        }),
        address: z.string({
          required_error: 'Local Guardian address is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is Required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is Required',
      }),
      email: z
        .string({
          required_error: 'Email is Required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'ContactNo is Required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency ContactNo is Required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address ContactNo is Required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address ContactNo is Required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is Required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is Required',
      }),

      profileImage: z
        .string({
          required_error: 'Profile Image is Required',
        })
        .optional(),
    }),
  }),
});
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is Required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is Required',
      }),
      email: z
        .string({
          required_error: 'Email is Required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'ContactNo is Required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency ContactNo is Required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address ContactNo is Required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address ContactNo is Required',
      }),
      managementDepartment: z.string({
        required_error: 'Management Department is Required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

export const userValidation = {
  createUserZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
