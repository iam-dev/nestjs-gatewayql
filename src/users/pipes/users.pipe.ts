import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { User } from '../models/user.interface';

@Injectable()
export class UsersPipe implements PipeTransform<User, User> {
  private errorString = 'Incoming user is not formatted correctly. ';

  transform(value: User): User {
    if (value.firstname && typeof value.firstname !== 'string') {
      throw new BadRequestException(this.errorString + 'firstname must be a string.');
    }
    if (value.lastname && typeof value.lastname !== 'string') {
      throw new BadRequestException(this.errorString + 'lastname must be a string.');
    }
    if (value.username && typeof value.username !== 'string') {
      throw new BadRequestException(this.errorString + 'username must be a string.');
    }
    if (value.email && typeof value.email !== 'string') {
      throw new BadRequestException(this.errorString + 'email must be a string.');
    }
    if (!isEmail(value.email)) {
      throw new BadRequestException(this.errorString + 'email must be an email.');
    }
    if (value.redirectUri && typeof value.redirectUri !== 'string') {
      throw new BadRequestException(this.errorString + 'redirectUri must be a string.');
    }
    return value;
  }
}
