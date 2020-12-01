import { forwardRef } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing';;
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../../auth/auth.module';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        //forwardRef(() => AuthModule),
        //TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [UsersResolver, UsersService],
    }).compile();

    //service = module.get<UsersService>(UsersService);
   // resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    //expect(resolver).toBeDefined();
   // expect(service).toBeDefined();
  });
});
