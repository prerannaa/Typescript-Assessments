import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config";
import UserModel from "../models/userModel";
import { ISignUp } from "../interface/auth";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant/jwt";
import UnauthenticatedError from "../error/unauthenticatedError";
import BadRequestError from "../error/badRequest";

const SALT_ROUNDS = 10;

export const signup = async (body: ISignUp) => {
  const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

  const usernameExists = await UserModel.getByUsername(body.username);

  if (usernameExists) {
    throw new BadRequestError(`User with username: ${body.username} already exists`);
  }

  await UserModel.create({
    ...body,
    password: hashedPassword,
  });

  return {
    message: "User signed up successfully",
  };
};

export const login = async (body: ISignUp) => {
  const user = await UserModel.getByUsername(body.username);

  if (!user) {
    throw new BadRequestError("Invalid username or Password");
  }

  const passwordMatch = await bcrypt.compare(body.password, user.password);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid username or Password");
  }

  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return {
    accessToken,
    refreshToken,
  };
};
