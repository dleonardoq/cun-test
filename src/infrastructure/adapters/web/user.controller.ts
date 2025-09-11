import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserUseCases } from '../../../application/use-cases/user.use-cases';
import { CreateUserDto } from '../../../shared/dtos/create-user.dto';
import { UpdateUserDto } from '../../../shared/dtos/update-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userUseCases.createUser(createUserDto);
  }

  @Get()
  async getAllUsers() {
    return await this.userUseCases.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userUseCases.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userUseCases.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userUseCases.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
