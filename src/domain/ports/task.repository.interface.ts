import { Task } from '../entities/task.entity'
import { TaskStatus } from '../../shared/enums/task-status.enum'

export interface TaskRepositoryInterface {
  create(task: Partial<Task>): Promise<Task>
  findById(id: string): Promise<Task | null>
  findByUserId(userId: string, status?: TaskStatus): Promise<Task[]>
  findAll(): Promise<Task[]>
  update(id: string, task: Partial<Task>): Promise<Task>
  softDelete(id: string): Promise<void>
  delete(id: string): Promise<void>
}