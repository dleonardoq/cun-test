import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../../domain/ports/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findById(identifyNumber: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { identifyNumber} });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(identifyNumber: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update({ identifyNumber }, user);
    return await this.findById(identifyNumber);
  }

  async delete(identifyNumber: number): Promise<void> {
    await this.userRepository.delete({ identifyNumber });
  }
}
