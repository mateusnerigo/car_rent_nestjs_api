import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './repositories/user.repository';

import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';

import { UserRole } from './enums/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('Passwords do not match.');
    } else {
      return await this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
}
