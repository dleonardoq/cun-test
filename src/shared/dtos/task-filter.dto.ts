import { IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class TaskFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
