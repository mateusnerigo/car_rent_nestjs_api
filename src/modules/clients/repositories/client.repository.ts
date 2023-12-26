import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Client } from "../entities/client.entity";
import { DataSource, Repository } from "typeorm";
import { CreateClientDto } from "../dto/create-client.dto";

@Injectable()
export class ClientRepository extends Repository<Client> {
  constructor(private dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const { email, name } = createClientDto;

    const client = this.create();
    client.email = email;
    client.name = name;

    try {
      await client.save();
      return client;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Email already registered.');
      } else {
        throw new InternalServerErrorException(
          'Error saving new user to database.'
        )
      }
    }
  }
}
