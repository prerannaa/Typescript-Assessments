import BaseModel from "./baseModel";
import { ITodo } from "../interface/todo";

export default class TodoModel extends BaseModel {
    static async createTask(task: ITodo) {
      return this.queryBuilder().insert(task).table("todos");
    }
    
    static async findById(id:number){
      return this.queryBuilder().select({
          id:"id",
          title:"title",
          completed:"completed"
      }).where({id})
    }
    static async deleteTask(id: number) {
      return this.queryBuilder().table("todos").where({ id }).del();
    }
    
    static async updateTaskTitle(id: number, title: string) {
      const updatedTask = {
        title: "title",
        completed: "completed"
      };
    
      return this.queryBuilder().table("todos").where({ id }).update(updatedTask);
    }
    }


