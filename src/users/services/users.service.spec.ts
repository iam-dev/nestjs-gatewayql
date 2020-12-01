import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';
import { UserRole } from '../entities/user.interface';

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertOne', () => {
    it('should successfully insert a cat', () => {
      expect(
        service.create({
          firstname: 'John',
          lastname: 'Doe',
          username: 'john.doe',
          email: 'john.doe@test.com',
        }),
      ).resolves.toEqual(oneUser);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        firstname: 'John',
          lastname: 'Doe',
          username: 'john.doe',
          email: 'john.doe@test.com',
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });
});
