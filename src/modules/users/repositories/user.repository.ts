import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { DataSource, Repository } from "typeorm";

import { User } from "../entities/user.entity";

import { CreateUserDto } from "../dto/create-user.dto";
import { CredentialsDto } from "src/modules/auth/dto/credentials.dto";
import { FindUsersQueryDto } from "../dto/find-users-query.dto";
import { FoundUsersDto } from "../dto/found-users-dto";

import { UserRole } from "../enums/user-roles.enum";


@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
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

  async findUsers(queryDto: FindUsersQueryDto): Promise<FoundUsersDto> {
    queryDto.status = (queryDto.status === undefined) ? true : queryDto.status;
    queryDto.page = (queryDto.page < 1) ? 1 : queryDto.page;
    queryDto.limit = (queryDto.limit > 100) ? 100 : queryDto.limit;

    const { email, name, status, role } = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    if (email) {
      query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (name) {
      query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    const [users, total] = await query
      .skip((queryDto.page - 1) * queryDto.limit)
      .take(+queryDto.limit)
      .orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined)
      .select(['user.name', 'user.email', 'user.role', 'user.status'])
      .getManyAndCount();

    return { users, total };
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({
      where: {
        email,
        status: true
      }
    });

    return (user && (await user.checkPassword(password)))
      ? user
      : null;
  }

  private async hashPassword (password: string, salt: string = ''): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
