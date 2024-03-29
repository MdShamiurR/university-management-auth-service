import { z } from 'zod';

// req- validation
// body-->object  (id,role,password)
//  data -->object

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});
const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password is required' }),
    newPassword: z.string({ required_error: 'New Password is required' }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh Token is required' }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
