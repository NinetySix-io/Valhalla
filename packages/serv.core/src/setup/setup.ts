import { BOOT, IBoot } from '@nestcloud2/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { INestApplication, Logger } from '@nestjs/common';

export class ServCoreSetup {
  app: INestApplication;
  protoPath: string | string[];
  package: string;
  hostname = '0.0.0.0';
  logger = Logger;
  withGrpc: boolean;

  constructor(
    app: INestApplication,
    options: {
      protoPath: ServCoreSetup['protoPath'];
      grpcPackage: ServCoreSetup['package'];
      hostName?: ServCoreSetup['hostname'];
      withGrpc?: ServCoreSetup['withGrpc'];
    },
  ) {
    this.app = app;
    this.protoPath = options.protoPath;
    this.withGrpc = options.withGrpc ?? true;
    this.package = options.grpcPackage;
    this.hostname = options?.hostName ?? this.hostname;
  }

  private get boot() {
    return this.app.get<IBoot>(BOOT);
  }

  private get servicePort(): number {
    return this.boot.get('service.port');
  }

  /**
   * It starts the microservice and the REST server
   */
  async setup(): Promise<void> {
    if (this.withGrpc) {
      const options: GrpcOptions['options'] = {
        url: this.hostname + ':' + (this.servicePort + 100),
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
