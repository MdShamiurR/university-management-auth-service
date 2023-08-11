import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresTime: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expiresTime });
};
// const verifyToken = jwt.verify(refreshToken, config.jwt.refresh_secret as Secret);
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JwtHelpers = {
  createToken,
  verifyToken,
};
