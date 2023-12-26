import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/modules/auth/decorators/role.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { ClientsService } from 'src/modules/clients/clients.service';
import { CreateClientDto } from 'src/modules/clients/dto/create-client.dto';
import { Client } from 'src/modules/clients/entities/client.entity';
import { UserRole } from 'src/modules/users/enums/user-roles.enum';

@ApiTags('Clients')
@Controller('clients')
@UseGuards(AuthGuard(), RolesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @Role(UserRole.USER)
  async createClient(
    @Body(ValidationPipe) createClientDto: CreateClientDto
  ): Promise<Client> {
    const client = await this.clientsService.createClient(createClientDto);
    return client;
  }
}
