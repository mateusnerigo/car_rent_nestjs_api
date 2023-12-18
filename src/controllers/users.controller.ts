import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { ReturnUserDto } from 'src/modules/users/dto/return-user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Admin created successfully!'
    }
  }
}
