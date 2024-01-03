import { Request, Response } from 'express';
import * as todoService from '../services/todoService';

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const todo = await todoService.createTodo(title);
    res.status(201).json({ todo });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedTodo = await todoService.updateTodo(parseInt(id), title, completed);
    if (updatedTodo) {
      res.json({ updatedTodo });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await todoService.deleteTodo(parseInt(id));
    res.json({ message: 'Todo deleted successfully' });
  } catch (error: any) { 
    res.status(400).json({ error: error.message });
  }
};
