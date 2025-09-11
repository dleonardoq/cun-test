import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskUseCases } from '../../../application/use-cases/task.use-cases';
import { CreateTaskDto } from '../../../shared/dtos/create-task.dto';
import { UpdateTaskDto } from '../../../shared/dtos/update-task.dto';
import { TaskFilterDto } from '../../../shared/dtos/task-filter.dto';

@Controller('tasks')
@UsePipes(new ValidationPipe({ transform: true }))
export class TaskController {
  constructor(private readonly taskUseCases: TaskUseCases) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskUseCases.createTask(createTaskDto);
  }

  @Get()
  async getAllTasks() {
    return await this.taskUseCases.getAllTasks();
  }

  @Get('user/:userId')
  async getTasksByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() filter: TaskFilterDto,
  ) {
    return await this.taskUseCases.getTasksByUserId(userId, filter);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return await this.taskUseCases.getTaskById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskUseCases.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    await this.taskUseCases.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }
}
