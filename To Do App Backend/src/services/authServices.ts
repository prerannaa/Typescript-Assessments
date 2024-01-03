// src/services/jwtService.ts
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_default_secret';

export const generateAccessToken = (userId: number): string => {
  return jwt.sign({ userId }, secret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: number): string => {
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
