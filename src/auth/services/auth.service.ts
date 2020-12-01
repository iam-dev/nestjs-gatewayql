import { Injectable,} from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import *  as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  encrypt (text) {
    const { algorithm, cipherKey } = this.configService.get('crypto');
    const cipher = crypto.createCipher(algorithm, cipherKey);
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  }
  
  decrypt (password) {
    const { algorithm, cipherKey } = this.configService.get('crypto');
    const decipher = crypto.createDecipher(algorithm, cipherKey);
    return decipher.update(password, 'hex', 'utf8') + decipher.final('utf8');
  }

  compareSaltAndHashed (password, hash): Observable<any> {
    return from((!password || !hash) ? null : bcrypt.compare(password, hash));
  }

  saltAndHash(password: string): Observable<any> {
    if (password === undefined || password === '' || !password || typeof password !== 'string') {
      return throwError('invalid arguments');
    }

    return from<string>(bcrypt
      .genSalt(this.configService.get<string>('crypto.saltRounds'))
      .then((salt) => bcrypt.hash(password, salt)));
  }
}
