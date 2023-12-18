import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../users/repositories/user.repository';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

import { User } from '../users/entities/user.entity';

import { UserRole } from '../users/enums/user-roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('Passwords do not match.');
    }

    return await this.userRepository.createUser(createUserDto, UserRole.USER);
  }

  async signIn(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.sign({
      id: user.id
    });

    return { token };
  }
}
