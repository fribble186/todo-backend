import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO, SyncDTO } from './interfaces/todo.interface';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async sync({ email, data }: { email: string; data: any }) {
    const Todo = await this.todoRepository.findOne({ where: { email } });
    console.log(Todo, email);
    if (Todo) {
      let todoInLocal = data.data;
      const todoInDB = JSON.parse(Todo.data).data;
      while (todoInLocal.length) {
        todoInLocal = todoInLocal.filter((todo) => todo.status);
        if (todoInLocal.length) {
          const curTodo = todoInLocal[0];
          const status = curTodo.status;
          const curTodoInDBIndex = todoInDB.findIndex(
            (todo) =>
              todo.id === curTodo.id && todo.content === curTodo.content,
          );
          if (status === 'CHANGE') {
            // 原来没有的 change => add，直接 push
            // 原来有的 change，直接 change
            if (curTodoInDBIndex === -1) {
              delete curTodo['status'];
              todoInDB.push(curTodo);
            } else {
              delete curTodo['status'];
              todoInDB[curTodoInDBIndex] = curTodo;
            }
          } else if (status === 'DELETE') {
            // 原来没有的 delete，不管
            // 原来有的 delete，直接 splice
            if (curTodoInDBIndex !== -1) {
              todoInDB.splice(curTodoInDBIndex, 1);
            }
          } else if (status === 'ADD') {
            // 原来就有的 add，不管
            // 原来没有的 add，直接 push
            if (curTodoInDBIndex === -1) {
              delete curTodo['status'];
              todoInDB.push(curTodo);
            }
          }
          todoInLocal.splice(0, 1);
        }
      }
      Todo.data = JSON.stringify({ data: todoInDB });
      await this.todoRepository.save(Todo);
    } else {
      await this.todoRepository.insert({ email, data: JSON.stringify(data) });
    }
    return { success: true, data: Todo.data };
  }

  async getTodo({ email }: { email: string }) {
    const Todo = await this.todoRepository.findOne({ where: { email } });
    if (Todo) {
      return {
        success: true,
        data: Todo.data,
      };
    } else {
      return {
        success: false,
        message: '还没有同步过',
      };
    }
  }
}
