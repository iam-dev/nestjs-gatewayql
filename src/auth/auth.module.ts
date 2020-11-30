import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get('jwt_secret'),
            signOptions: {expiresIn: '10000s'}
        })
    })
],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}