import HttpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import * as authService from "../services/authService";
import { ISignUp } from "../interface/auth";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: ISignUp = req.body;

    await authService.signup(body);

    return res.status(HttpStatus.CREATED).json({
      message: "Signed up successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const data = await authService.login(body);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
