import { Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { FoundUsersDto } from './dto/found-users-dto';

import { User } from './entities/user.entity';

import { UserRole } from './enums/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('Passwords do not match.');
    }

    return await this.userRepository.createUser(createUserDto, UserRole.ADMIN);
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: [ 'email', 'name', 'role', 'id' ],
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    const { name, email, role, status } = updateUserDto;

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;
    user.status = status ?? user.status;

    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error saving user data.');
    }
  }

  async deleteUser(id: string) {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('No user found.');
    }
  }

  async findUsers(queryDto: FindUsersQueryDto): Promise<FoundUsersDto> {
    const users = await this.userRepository.findUsers(queryDto);
    return users;
  }
}
