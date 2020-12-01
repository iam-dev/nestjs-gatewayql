import { forwardRef } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing';;
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../../auth/auth.module';
import { UserEntity } from '../models/user.entity';
import { UsersService } from '../services/users.service';
import { User, UserRole } from '../models/user.interface';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  const oneUser = new UserEntity();
  oneUser.firstname = 'John';
  oneUser.lastname = 'Doe';
  oneUser.username = 'john.doe';
  oneUser.email = 'john.doe@test.com';
  oneUser.password = 'secret';
  oneUser.role = UserRole.ADMIN;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersResolver],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            create: jest
              .fn()
              .mockImplementation((user: User) =>
              Promise.resolve({ id: 'a uuid', ...user }),
            ),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          }
        } 
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
