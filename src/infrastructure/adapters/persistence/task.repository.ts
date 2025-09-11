import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from '../../../domain/entities/task.entity'
import { TaskRepositoryInterface } from '../../../domain/ports/task.repository.interface'
import { TaskStatus } from '../../../shared/enums/task-status.enum'

@Injectable()
export class TaskRepository implements TaskRepositoryInterface {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task)
    return await this.taskRepository.save(newTask)
  }

  async findById(id: string): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['user'],
    })
  }

  async findByUserId(userId: number, status?: TaskStatus): Promise<Task[]> {
    const whereCondition: any = { userId, isDeleted: false }
    if (status) {
      whereCondition.status = status
    }

    return await this.taskRepository.find({
      where: whereCondition,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    })
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { isDeleted: false },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    })
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, task)
    return await this.findById(id)
  }

  async softDelete(id: string): Promise<void> {
    await this.taskRepository.update(id, { isDeleted: true })
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id)
  }
}
