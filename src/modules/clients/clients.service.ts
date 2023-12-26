import { Injectable } from "@nestjs/common";
import { ClientRepository } from "./repositories/client.repository";
import { Client } from "./entities/client.entity";
import { CreateClientDto } from "./dto/create-client.dto";

@Injectable()
export class ClientsService {
  constructor (private readonly clientRepository: ClientRepository) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientRepository.createClient(createClientDto);
  }
}
