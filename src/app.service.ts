import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}
  getHello(): string {
    this.logger.verbose('verbose');
    this.logger.debug('debug');
    this.logger.log('log');
    this.logger.warn('warn');
    this.logger.error('error');
    this.logger.fatal('fatal');
    return 'Hello World!';
  }
}
