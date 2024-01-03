import { getRepository, UpdateResult, DeleteResult } from 'typeorm';
import { Todo } from '../models/Todo';

export const getAllTodos = async (): Promise<Todo[]> => {
  const todoRepository = getRepository(Todo);
  return todoRepository.find();
};

export const createTodo = async (title: string): Promise<Todo> => {
  const todoRepository = getRepository(Todo);
  const newTodo = todoRepository.create({ title });
  return todoRepository.save(newTodo);
};

export const updateTodo = async (id: number, title?: string, completed?: boolean): Promise<Todo | null> => {
  const todoRepository = getRepository(Todo);

  try {
    const todo = await todoRepository.findOneOrFail({ where: { id } });
    todo.title = title !== undefined ? title : todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;

    await todoRepository.save(todo);

    return todo;
  } catch (error) {
    return null;
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  const todoRepository = getRepository(Todo);

  try {
    await todoRepository.delete(id);
  } catch (error) {
    // Handle error if needed
  }
};
