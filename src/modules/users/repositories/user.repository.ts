import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { Repository } from "typeorm";

import { User } from "../entities/user.entity";

import { CreateUserDto } from "../dto/create-user.dto";

import { UserRole } from "../enums/user-roles.enum";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole
  ): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;

      return user;
    } catch (error) {
      if (error.code.toString() === '23505')  {
        throw new ConflictException('Email already registered.');
      } else {
        throw new InternalServerErrorException(
          'Error saving new user to database.'
        )
      }
    }
  }

  private async hashPassword (password: string, salt: string = ''): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
