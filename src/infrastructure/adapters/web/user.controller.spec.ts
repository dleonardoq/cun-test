import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserUseCases } from '../../../application/use-cases/user.use-cases';
import { CreateUserDto } from '../../../shared/dtos/create-user.dto';
import { UpdateUserDto } from '../../../shared/dtos/update-user.dto';
import { User } from '../../../domain/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userUseCases: jest.Mocked<UserUseCases>;

  const mockUser: User = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    identifyNumber: 123456789,
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    tasks: [],
  };

  beforeEach(async () => {
    const mockUserUseCases = {
      createUser: jest.fn(),
      getUserById: jest.fn(),
      getAllUsers: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserUseCases,
          useValue: mockUserUseCases,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userUseCases = module.get(UserUseCases);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        identifyNumber: 123456789,
        email: 'test@example.com',
        name: 'Test User',
      };

      userUseCases.createUser.mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(userUseCases.createUser).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [mockUser];
      userUseCases.getAllUsers.mockResolvedValue(users);

      const result = await controller.getAllUsers();

      expect(userUseCases.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      userUseCases.getUserById.mockResolvedValue(mockUser);

      const result = await controller.getUserById(mockUser.identifyNumber);

      expect(userUseCases.getUserById).toHaveBeenCalledWith(mockUser.identifyNumber);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };
      const updatedUser = { ...mockUser, name: 'Updated Name' };

      userUseCases.updateUser.mockResolvedValue(updatedUser);

      const result = await controller.updateUser(mockUser.identifyNumber, updateUserDto);

      expect(userUseCases.updateUser).toHaveBeenCalledWith(mockUser.identifyNumber, updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      userUseCases.deleteUser.mockResolvedValue(undefined);

      const result = await controller.deleteUser(mockUser.identifyNumber);

      expect(userUseCases.deleteUser).toHaveBeenCalledWith(mockUser.identifyNumber);
      expect(result).toEqual({ message: 'User deleted successfully' });
    });
  });
});
