import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../../domain/entities/task.entity';
import { TaskRepository } from './task.repository';
import { TaskUseCases } from '../../../application/use-cases/task.use-cases';
import { TaskController } from '../web/task.controller';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    {
      provide: 'TaskRepositoryInterface',
      useClass: TaskRepository,
    },
    {
      provide: TaskUseCases,
      useFactory: (taskRepository: TaskRepository, userRepository: any) => {
        return new TaskUseCases(taskRepository, userRepository);
      },
      inject: [TaskRepository, 'UserRepositoryInterface'],
    },
  ],
  exports: [TaskRepository, 'TaskRepositoryInterface'],
})
export class TaskModule {}
