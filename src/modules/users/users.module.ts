import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './repositories/user.repository';

import { UsersService } from './users.service';

import { UsersController } from 'src/controllers/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
