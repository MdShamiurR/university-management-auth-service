import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { JwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //get authoorization token
      const token = req.headers.authorization;
      //   console.log('token authorized', token);
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized');
      }
      // varify token
      let verifiedUser = null;

      verifiedUser = JwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser; //role ,userId
      //role guard,authorization done
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
