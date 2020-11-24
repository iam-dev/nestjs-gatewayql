import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { GatewayModuleOptions, GatewayOptionsFactory } from '@nestjs/graphql';
import { ServiceDefinition } from '@apollo/federation';

@Injectable()
export class CustomConfigService implements GatewayOptionsFactory {
  constructor(
    private configService: ConfigService
  ){}

  public createGatewayOptions(): Partial<GatewayModuleOptions> {
    return {
      gateway: {
        serviceList: this.serviceList(),
      },
    };
  }

  private serviceList() : Pick<ServiceDefinition, 'name' | 'url'>[] {
    const serviceEndpoints = this.configService.get<string>('serviceEndpoints');
    if (Array.isArray(serviceEndpoints)) {
      return serviceEndpoints;
    } else {
      return [];
    }
  } 
}
