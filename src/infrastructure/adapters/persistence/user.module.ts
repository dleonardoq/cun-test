import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from './user.repository';
import { UserUseCases } from '../../../application/use-cases/user.use-cases';
import { UserController } from '../web/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserRepository,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: UserUseCases,
      useFactory: (userRepository: UserRepository) => {
        return new UserUseCases(userRepository);
      },
      inject: [UserRepository],
    },
  ],
  exports: [UserRepository, 'UserRepositoryInterface'],
})
export class UserModule {}
