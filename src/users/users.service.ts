import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from './entities/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService
  ) {}

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = passwordHash;
        newUser.redirectUri = user.redirectUri

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const {password, ...result} = user;
            return result;
          }),
            catchError(err => throwError(err))
        )
      })
    )
  }

  findOne(id: string): Observable<User> {
    return from(this.userRepository.findOne({id})).pipe(
      map((user: User) => {
          const {password, ...result} = user;
          return result;
      } )
    )
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {delete v.password});
        return users;
      })
    );
  }

  deleteOne(id: string): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: string, user: User): Observable<any> {
    delete user.email;
    delete user.password;

    return from(this.userRepository.update(id, user)).pipe(
        switchMap(() => this.findOne(id))
    );
  } 

  findByemail(email: string): Observable<User> {
    return from(this.userRepository.findOne({email}));
  }

  findByUsername(username: string): Observable<User> {
    return from(this.userRepository.findOne({username}));
  }
}
