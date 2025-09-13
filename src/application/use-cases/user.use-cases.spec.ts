import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserUseCases } from './user.use-cases';
import { UserRepositoryInterface } from '../../domain/ports/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../shared/dtos/create-user.dto';
import { UpdateUserDto } from '../../shared/dtos/update-user.dto';

describe('UserUseCases', () => {
  let userUseCases: UserUseCases;
  let userRepository: jest.Mocked<UserRepositoryInterface>;

  const mockUser: User = {
    identifyNumber: 123456789,
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    tasks: [],
  };

  beforeEach(async () => {
    const mockUserRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUseCases,
        {
          provide: 'UserRepositoryInterface',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userUseCases = module.get<UserUseCases>(UserUseCases);
    userRepository = module.get('UserRepositoryInterface');
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        identifyNumber: 123456789,
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockResolvedValue(mockUser);

      const result = await userUseCases.createUser(createUserDto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });

    it('should throw ConflictException if user with email already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        identifyNumber: 123456789,
      };

      userRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(userUseCases.createUser(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return user if found', async () => {
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await userUseCases.getUserById(mockUser.identifyNumber);

      expect(userRepository.findById).toHaveBeenCalledWith(mockUser.identifyNumber);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(userUseCases.getUserById(12345678559)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };
      const updatedUser = { ...mockUser, name: 'Updated Name' };

      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue(updatedUser);

      const result = await userUseCases.updateUser(mockUser.identifyNumber, updateUserDto);

      expect(userRepository.findById).toHaveBeenCalledWith(mockUser.identifyNumber);
      expect(userRepository.update).toHaveBeenCalledWith(mockUser.identifyNumber, updatedUser);
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      userRepository.findById.mockResolvedValue(null);

      await expect(
        userUseCases.updateUser(12345678559, updateUserDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
