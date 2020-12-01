import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCredentialInput } from '../dto/create-credential.input';
import { UpdateCredentialInput } from '../dto/update-credential.input';
import { CredentialEntity } from '../models/credential.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(CredentialEntity) private readonly credentialRepository: Repository<CredentialEntity>,
  ) {}

  create(createCredentialInput: CreateCredentialInput) {
    return 'This action adds a new credential';
  }

  findAll() {
    return `This action returns all credentials`;
  }

  findOne(id: string) {
    return `This action returns a #${id} credential`;
  }

  update(id: string, updateCredentialInput: UpdateCredentialInput) {
    return `This action updates a #${id} credential`;
  }

  remove(id: string) {
    return `This action removes a #${id} credential`;
  }
}
