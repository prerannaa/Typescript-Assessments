import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userService.signup(username, password);
    res.status(201).json({ user });
  } catch (error: any) { 
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const accessToken = await userService.login(username, password);
    res.json({ accessToken });
  } catch (error: any) { 
    res.status(401).json({ error: error.message });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const accessToken = await userService.refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error: any) { 
    res.status(401).json({ error: error.message });
  }
};
