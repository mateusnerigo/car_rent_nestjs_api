import { Module } from '@nestjs/common';
import { ClientsController } from 'src/controllers/clients.controller';
import { ClientsService } from './clients.service';
import { ClientRepository } from './repositories/client.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [ ClientsController ],
  providers: [
    ClientsService,
    ClientRepository
  ]
})
export class ClientsModule {}
