import { Boot, InjectBoot } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServAppConfigService {
  constructor(@InjectBoot() protected readonly boot: Boot) {}

  get host(): string {
    return this.boot.get('service.discoveryHost');
  }

  get port(): number {
    return this.boot.get('service.port');
  }

  get tags(): string[] {
    return this.boot.get('service.tags');
  }

  private get grpcPort(): number {
    return this.port + 10;
  }

  get gRpcUrl(): string {
    return `${this.host}:${this.grpcPort}`;
  }

  get hasGraphql(): boolean {
    return this.tags.includes('graphql');
  }
}
