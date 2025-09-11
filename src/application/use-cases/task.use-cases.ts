import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepositoryInterface } from '../../domain/ports/task.repository.interface';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../../shared/dtos/create-task.dto';
import { UpdateTaskDto } from '../../shared/dtos/update-task.dto';
import { TaskFilterDto } from '../../shared/dtos/task-filter.dto';

@Injectable()
export class TaskUseCases {
  constructor(
    private readonly taskRepository: TaskRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findById(createTaskDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const taskData = {
      ...createTaskDto,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
    };

    return await this.taskRepository.create(taskData);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async getTasksByUserId(userId: string, filter?: TaskFilterDto): Promise<Task[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.taskRepository.findByUserId(userId, filter?.status);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updateData = {
      ...updateTaskDto,
      dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined,
    };

    return await this.taskRepository.update(id, updateData);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.softDelete(id);
  }
}
