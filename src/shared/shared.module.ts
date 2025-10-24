import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { PrettyOptions } from 'pino-pretty';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      useExisting: true,
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: 'debug',
              options: {
                colorize: true,
                singleLine: true,
                translateTime: 'SYS:yyyy-MM-dd HH:mm:ss',
                ignore: 'context,hostname',
                messageFormat: '{if context}[{context}]{end}{msg}',
              } as PrettyOptions,
            },
            {
              target: 'pino-roll',
              level: 'info',
              options: {
                file: join('logs', 'info'),
                size: '10m',
                frequency: 'daily',
                extension: '.log',
                dateFormat: 'yyyy-MM-dd',
                mkdir: true,
              },
            },
          ],
        },
      },
    }),
  ],
})
export class SharedModule {}
