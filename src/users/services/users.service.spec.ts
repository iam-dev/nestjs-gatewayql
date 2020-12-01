import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UsersService } from './users.service';
import { UserRole } from '../models/user.interface';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/services/auth.service';
import { ConfigService } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<UserEntity>

  const oneUser = new UserEntity();
  oneUser.firstname = 'John';
  oneUser.lastname = 'Doe';
  oneUser.username = 'john.doe';
  oneUser.email = 'john.doe@test.com';
  oneUser.password = 'secret';
  oneUser.role = UserRole.ADMIN;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        UsersService, 
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockReturnValue(oneUser),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));

    service.create({
      firstname: 'admin',
      lastname: 'admin',
      username: 'admin.admin',
      email: 'admin.admin@test.com',
      role: UserRole.ADMIN
    })
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully insert an user', () => {
      expect(
        service.create({
          firstname: 'John',
          lastname: 'Doe',
          username: 'john.doe',
          email: 'john.doe@test.com',
        })
      );
    });
  });

  describe('findAll', () => {
    it('should return users', async () => {
      expect(
        await service.findByemail('admin.admin@test.com')
      )
    });
  });

});
