import { Boot, InjectBoot } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';

/* The class provides a way to access the service configuration from the boot object */
@Injectable()
export class ServAppConfigService {
  constructor(@InjectBoot() protected readonly boot: Boot) {}

  static calculateRestPort(port: number) {
    //TODO: Dirty but works for now
    return port + 10;
  }

  /**
   * The function returns the value of the `service.discoveryHost` key from the `boot` object
   * @returns The hostname of the service discovery server.
   */
  get host(): string {
    return this.boot.get('service.discoveryHost');
  }

  /**
   * The function returns the value of the environment variable PORT, or the value of the service.port
   * property in the config.yaml file
   * @returns The port number of the service.
   */
  private get port(): number {
    return Number(process.env.PORT) || this.boot.get('service.port');
  }

  /**
   * It returns the value of the `service.tags` key from the `boot` object
   * @returns The tags property is being returned.
   */
  get tags(): string[] {
    return this.boot.get('service.tags');
  }

  get grpcPort(): number {
    return this.port;
  }

  get restPort(): number {
    return ServAppConfigService.calculateRestPort(this.port);
  }

  /**
   * It returns the host and port of the gRpc server.
   * @returns The gRpcUrl property is being returned.
   */
  get gRpcUrl(): string {
    return `${this.host}:${this.grpcPort}`;
  }

  /**
   * It returns the rest url
   * @returns The restUrl property is being returned.
   */
  get restUrl(): string {
    return `${this.host}:${this.restPort}`;
  }

  /**
   * It checks if the tags array includes the string 'graphql'
   * @returns A boolean value.
   */
  get hasGraphql(): boolean {
    return this.tags.includes('graphql');
  }
}
