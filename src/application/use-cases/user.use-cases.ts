import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface'
import { User } from '../../domain/entities/user.entity'
import { CreateUserDto } from '../../shared/dtos/create-user.dto'
import { UpdateUserDto } from '../../shared/dtos/update-user.dto'

@Injectable()
export class UserUseCases {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findByEmail(createUserDto.email)
    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    // Check if user with identify number already exists
    const existingIdentifyNumber = await this.userRepository.findById(createUserDto.identifyNumber)
    if (existingIdentifyNumber) {
      throw new ConflictException('User with this identify number already exists')
    }

    const user = new User()
    user.identifyNumber = createUserDto.identifyNumber
    user.email = createUserDto.email
    user.name = createUserDto.name

    return await this.userRepository.create(user)
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id)

    // Check if email is being updated and if it's already taken
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(updateUserDto.email)
      if (existingUser) {
        throw new ConflictException('User with this email already exists')
      }
    }

    // Update user properties
    if (updateUserDto.email) user.email = updateUserDto.email
    if (updateUserDto.name) user.name = updateUserDto.name

    return await this.userRepository.update(id, user)
  }

  async deleteUser(id: number): Promise<void> {
    await this.getUserById(id)
    await this.userRepository.delete(id)
  }
}