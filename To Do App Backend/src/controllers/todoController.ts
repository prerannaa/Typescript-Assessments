import { NextFunction, Request, Response } from "express";
import * as todoService from "../services/todoService";
import { title } from "process";

export const createTask = async (req: Request, res: Response) => {
  const { title, completed, task }: { title: string, completed: boolean, task: number } = req.body;

  const data = await todoService.createTask(title, completed, task);
  
  return res.json({
    data
  });
}

export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const data = await todoService.updateTask(id, title);
  
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
  
      const data = await todoService.deleteTask(id);
  
      return res.json({ message: "Task successfully deleted", data});
    } catch (error) {
      next(error);
    }
  };
  
