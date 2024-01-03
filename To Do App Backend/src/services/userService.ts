// src/services/userService.ts
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { generateAccessToken, generateRefreshToken, verifyToken } from './authServices';

export const signup = async (username: string, password: string): Promise<User> => {
  const userRepository = getRepository(User);
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    username,
    password: hashedPassword,
  });

  return userRepository.save(user);
};

export const login = async (username: string, password: string): Promise<string> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { username } });

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid username or password');
  }

  return generateAccessToken(user.id);
};

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const decodedToken: any = verifyToken(refreshToken);
  return generateAccessToken(decodedToken.userId);
};
