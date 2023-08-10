import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  ////   isExist
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // ).lean();

  //creating instance of user
  const user = new User();
  //access to our instance methods
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }

  // const isPasswordMatched = await bcrypt.compare(
  //   password,
  //   isUserExist?.password
  // );
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  //create access token
  // const accessToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist.role,
  //   },
  //   config.jwt.secret as Secret,
  //   {
  //     expiresIn: config.jwt.expires_in,
  //   }
  // );
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // const refreshToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist.role,
  //   },
  //   config.jwt.refresh_secret as Secret,
  //   {
  //     expiresIn: config.jwt.refresh_expires_in,
  //   }
  // );

  const refreshToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //varify token
  const refreshToken = token;
  let verifyToken = null;
  try {
    verifyToken = JwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret
    );

    // console.log('this is user ID token', verifyToken);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }
  const { userId } = verifyToken;
  // console.log('this is user ID token', userId, role);
  // //checking deleted user's refresh token
  const user = new User();
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  //generate new token
  const generateNewAccessToken = JwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: generateNewAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  passwordData: IChangePassword
): Promise<void> => {
  // eslint-disable-next-line no-unused-vars
  const { oldPassword, newPassword } = passwordData;

  // //checking user existance
  // const MyUser = new User();
  // const isUserExist = await MyUser.isUserExist(user?.userId);

  //alternative of checking user existance
  const MyUser = new User();
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'This User is not in our database'
    );
  }
  //checking old password
  if (
    isUserExist.password &&
    !(await MyUser.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is not Correct');
  }

  // //hash password before saving
  // const hashPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_rounds)
  // );
  // const updatedData = {
  //   password: hashPassword,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(),
  // };
  // //update Password
  // await User.findOneAndUpdate({ id: user?.userId }, updatedData);

  ////alternative of hashPassword
  // data update
  isUserExist.needsPasswordChange = false;

  // updateing uuinsg save
  isUserExist.save(); //userSchema.pre('save', async function (next) {
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
