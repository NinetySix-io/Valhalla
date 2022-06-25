import { DynamicModule, Module } from '@nestjs/common';

import { Logger } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common';
import { Provider } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

@Module({})
export class CqrsProviderModule {
  private static readonly logger = new Logger(CqrsProviderModule.name);
  private static get cqrsDir() {
    return path.resolve(__dirname, '../cqrs');
  }

  private static async getCqrsModule(
    type: 'commands' | 'queries',
    getHandler: (module: Record<string, unknown>, fileName: string) => unknown,
  ) {
    try {
      const readDir = promisify(fs.readdir);
      const targetDir = path.resolve(this.cqrsDir, type);
      const files = await readDir(targetDir);
      const withoutMapFiles = files.filter((v) => !v.endsWith('.map'));
      const providers: Provider[] = [];
      for (const file of withoutMapFiles) {
        try {
          const moduleDir = path.resolve(targetDir, file);
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const module = require(moduleDir);
          const handler = getHandler(module, file);
          if (handler) {
            providers.push(handler as Provider);
          }
        } catch (e) {
          this.logger.error('Unable to retrieve handler', e, file);
          continue;
        }
      }

      return providers;
    } catch {
      return [];
    }
  }

  private static fileNameToGrpcFn(type: 'command' | 'query', fileName: string) {
    let fnName = '';
    if (type === 'command') {
      fnName = fileName.split('.command')[0];
    } else {
      fnName = fileName.split('.query')[0];
    }

    return fnName
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  private static async getCommandHandlers() {
    return this.getCqrsModule('commands', (module, fileName) => {
      const property = this.fileNameToGrpcFn('command', fileName);
      return module[property + 'Handler'];
    });
  }

  private static async getQueryHandlers() {
    return this.getCqrsModule('queries', (module, fileName) => {
      const property = this.fileNameToGrpcFn('query', fileName);
      return module[property + 'Handler'];
    });
  }

  static async forRootAsync(props?: {
    imports?: ModuleMetadata['imports'];
    providers?: ModuleMetadata['providers'];
  }): Promise<DynamicModule> {
    const [commandHandlers, queryHandlers] = await Promise.all([
      this.getCommandHandlers(),
      this.getQueryHandlers(),
    ]);

    return {
      imports: props.imports,
      module: CqrsProviderModule,
      providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...(props?.providers ?? []),
      ],
    };
  }
}
