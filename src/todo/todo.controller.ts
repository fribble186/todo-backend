import { Controller, Post, Body } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('sync')
  async sync(@Body('email') email, @Body('data') data) {
    return await this.todoService.sync({ email, data });
  }

  @Post('getTodo')
  async getTodo(@Body('email') email) {
    return await this.todoService.getTodo({ email });
  }
}
