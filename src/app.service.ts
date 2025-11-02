import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from './config';

@Injectable()
export class AppService {
  constructor(private configSer: ConfigService<ConfigType>) {} // private readonly logger: Logger
  getHello(): string {
    const baseOpt = this.configSer.get('base', { infer: true });
    // this.logger.verbose('verbose');
    // this.logger.debug('debug');
    // this.logger.log('log');
    // this.logger.warn('warn');
    // this.logger.error('error');
    // this.logger.fatal('fatal');
    return 'Hello World!' + baseOpt?.port;
  }
}
