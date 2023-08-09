import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
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
    !user.isPasswordMatched(password, isUserExist?.password)
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

export const AuthService = {
  loginUser,
  refreshToken,
};
