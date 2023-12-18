import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/modules/auth/auth.service';
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';

import { CredentialsDto } from 'src/modules/auth/dto/credentials.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

import { User } from 'src/modules/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Registered successfully!'
    }
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<{ token: string }> {
    return await this.authService.signIn(credentialsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): User {
    return user;
  }

}
