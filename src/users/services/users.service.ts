import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  create(user: User): Observable<User> {
    return this.authService.saltAndHash(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        if (user.username === undefined || user.username === '' || user.username === null) {
          newUser.username = user.email;
        } else {
          newUser.username = user.username;
        }
        newUser.email = user.email;
        newUser.password = passwordHash;
        newUser.redirectUri = user.redirectUri;
        newUser.role = user.role;

        const createdUser = this.userRepository.create(newUser);

        return from(this.userRepository.save(createdUser)).pipe(
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
    delete user.role;
    
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

  validateUser(email: string, password: string): Observable<User> {
    return from(this.findByemail(email)).pipe(
      switchMap((user: User) => this.authService.compareSaltAndHashed(password, user.password).pipe(
        map((match: boolean) => {
          if(match) {
            const {password, ...result} = user;
            return result;
          } else {
            throw Error;
          }
        })
      ))
    )
  }
}
