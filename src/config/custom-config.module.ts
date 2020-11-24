import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { CustomConfigService } from './custom-config.service';

@Module({
  imports: [ConfigModule],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
