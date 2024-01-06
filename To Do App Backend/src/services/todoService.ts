import TodoModel from  "../models/todoModel";
import NotFoundError from "../error/notFoundError";

export const createTask = async (
    title:string,
    completed: boolean,
    task:number
) => {
  const data = await TodoModel.createTask({
    title,
    completed,
    created_by: task,
  });

  return data;
};


export const updateTask = async (id: number, title: string) => {
  const task = await TodoModel.findById(id);

  if (!task) {
    throw new NotFoundError(`Task with id: ${id} not found`);
  }

  await TodoModel.updateTaskTitle(id, title);
  return updateTask;
};

export const deleteTask = async (id: number) => {
  const task = await TodoModel.findById(id);

  if (!task) {
    throw new NotFoundError(`Task with id: ${id} not found`);
  }

  await TodoModel.deleteTask(id);
};
