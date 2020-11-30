import { Injectable,} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
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

  saltAndHash(password: string): Observable<string> {
    if (!password || typeof password !== 'string') {
      return Observable.throw('invalid arguments');
    }

    return bcrypt
      .genSalt(this.configService.get<string>('crypto.saltRounds'))
      .then((salt) => bcrypt.hash(password, salt));
  }
}
