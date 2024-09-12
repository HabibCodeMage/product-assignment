import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = '1h'; // Token expiration time

export const generateToken = (userId: string): string => {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, JWT_SECRET);
};
