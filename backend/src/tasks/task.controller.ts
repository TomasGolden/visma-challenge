import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks') // <--- IMPORTANTE: Esto define la ruta http://localhost:3000/tasks
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll() {
    return this.taskService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.taskService.create(body);
  }

  @Put(':id/complete')
  markAsCompleted(@Param('id') id: string) {
    return this.taskService.markAsCompleted(+id);
  }

  @Put(':id/pending')
  reopenTask(@Param('id') id: string) {
    return this.taskService.markAsPending(+id);
  }
}
