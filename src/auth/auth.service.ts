import { Injectable } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  hashPassword(password: string): Observable <string> {
      return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
      return from(bcrypt.compare(newPassword, passwortHash));
  }
}
