import { Request, Response, NextFunction } from "express";
import loggerWithNameSpace from "../util/logger";

const loggerFn = loggerWithNameSpace("Logger");

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loggerFn.info(`${req.method}: ${req.path}`);

  next();
};
