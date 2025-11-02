import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { PrettyOptions } from 'pino-pretty';
import { ConfigType, getAllConfig } from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getAllConfig],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigType>) => {
        const loggerOpt = configService.get('logger', {
          infer: true,
        });
        return {
          useExisting: true,
          pinoHttp: {
            transport: {
              targets: [
                {
                  target: 'pino-pretty',
                  level: loggerOpt?.PrettierLogLevel,
                  options: {
                    colorize: true,
                    singleLine: true,
                    translateTime: 'SYS:yyyy-MM-dd HH:mm:ss',
                    ignore: 'context,hostname,pid',
                    messageFormat: '{if context}[{context}]{end}{msg}',
                  } as PrettyOptions,
                },
                {
                  target: 'pino-roll',
                  level: loggerOpt?.RollerLogLevel,
                  options: {
                    file: join(process.cwd(), 'logs', 'info'),
                    frequency: 'daily',
                    dateFormat: 'yyyy-MM-dd',
                    extension: '.log',
                    mkdir: true,
                  },
                },
              ],
            },
          },
        };
      },
    }),
  ],
})
export class SharedModule {}
