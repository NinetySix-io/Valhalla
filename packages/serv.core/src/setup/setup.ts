import { BOOT, IBoot } from '@nestcloud2/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { INestApplication, Logger } from '@nestjs/common';

export class ServCoreSetup {
  app: INestApplication;
  protoPath: string | string[];
  package: string;
  hostname = '0.0.0.0';
  logger = Logger;

  constructor(
    app: INestApplication,
    options: {
      protoPath: ServCoreSetup['protoPath'];
      grpcPackage: ServCoreSetup['package'];
      hostName?: ServCoreSetup['hostname'];
    },
  ) {
    this.app = app;
    this.protoPath = options.protoPath;
    this.package = options.grpcPackage;
    this.hostname = options?.hostName ?? this.hostname;
  }

  private get boot() {
    return this.app.get<IBoot>(BOOT);
  }

  private get servicePort(): number {
    return this.boot.get('service.port');
  }

  private get gRpcPort(): number {
    return this.boot.get('grpc.port');
  }

  private get gRpcUrl(): string {
    return `${this.hostname}:${this.gRpcPort}`;
  }

  /**
   * It starts the microservice and the REST server
   */
  async setup(): Promise<void> {
    if (this.gRpcPort) {
      const options: GrpcOptions['options'] = {
        url: this.gRpcUrl,
        protoPath: this.protoPath,
        package: this.package,
      };

      this.logger.debug('gRPG', options);
      this.app.connectMicroservice<GrpcOptions>({
        transport: Transport.GRPC,
        options,
      });
    }

    await this.app.startAllMicroservices();
    await this.app.listen(this.servicePort);
    const url = await this.app.getUrl();
    this.logger.debug('REST started', {
      url,
    });
  }
}
