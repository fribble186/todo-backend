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
      Todo.data = JSON.stringify(data);
      await this.todoRepository.save(Todo);
    } else {
      await this.todoRepository.insert({ email, data: JSON.stringify(data) });
    }
    return { success: true };
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
