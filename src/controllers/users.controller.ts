import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Role } from 'src/modules/auth/decorators/role.decorator';

import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

import { UserRole } from 'src/modules/users/enums/user-roles.enum';

import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { ReturnUserDto } from 'src/modules/users/dto/return-user.dto';

import { UsersService } from 'src/modules/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
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
