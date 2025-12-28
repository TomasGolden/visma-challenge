import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Query('status') status?: string, @Query('userId') userId?: string) {
    return this.taskService.findAll(status, userId);
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
