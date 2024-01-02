import { Request,Response } from "express";

// import * as userService from "../service/user";

export const getUsers = (req: Request, res: Response) => {
    return res.json({
        message: "controller hi",
    });
}