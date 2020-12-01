import { UsersPipe } from './users.pipe';
import { BadRequestException } from '@nestjs/common';
import { User, UserRole } from '../models/user.interface';
import { CreateUserInput } from '../dto/create-user.input';

const failString = 'should throw an error for incorrect type';

describe('UsersPipe', () => {
  let pipe: UsersPipe;

  beforeEach(() => {
    pipe = new UsersPipe();
  });
  it('should be defined', () => {
    expect(new UsersPipe()).toBeDefined();
  });

  describe('successful calls', () => {
    it('should let the cat DTO go on through', () => {
      const user = { firstname: 'Test Name', lastname: 'Test lastname', username: 'test.username', email: 'Test.email@test.com', redirectUri: 'http://localhost/redirect', role: UserRole.USER };
      //expect(pipe.transform(user)).toEqual(CreateUserInput);
    });
  });

});
