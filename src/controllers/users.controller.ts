import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Role } from 'src/modules/auth/decorators/role.decorator';
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';

import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

import { UserRole } from 'src/modules/users/enums/user-roles.enum';

import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { ReturnUserDto } from 'src/modules/users/dto/return-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { FindUsersQueryDto } from 'src/modules/users/dto/find-users-query.dto';
import { ReturnFindUsersDto } from 'src/modules/users/dto/return-find-users.dto';

import { UsersService } from 'src/modules/users/users.service';

import { User } from 'src/modules/users/entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Admin created successfully!'
    }
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'User found!'
    }
  }

  @Get()
  @Role(UserRole.ADMIN)
  async findUsers(@Query() query: FindUsersQueryDto): Promise<ReturnFindUsersDto>  {
    const found = await this.usersService.findUsers(query);
    return {
      found,
      message: 'Users found!'
    };
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string
  ): Promise<User> {
    if ((user.role != UserRole.ADMIN) && (user.id.toString() != id)) {
      throw new ForbiddenException('Action not authorized.');
    }

    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'User removed successfully.'
    }
  }
}
