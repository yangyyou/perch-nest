import { DeepRequire } from '../utils/types';
import { Config as DevConfig } from './dev.config';
import { Config as ProdConfig } from './prod.config';
import { LevelWithSilent } from 'pino';

//#region BaseConfig
export interface BaseConfig {
  port?: number;
}

const defaultBaseConfig: Required<BaseConfig> = {
  port: 3000,
};
//#endregion

//#region Logger config
export interface LoggerConfig {
  PrettierLogLevel?: LevelWithSilent;
  RollerLogLevel?: LevelWithSilent;
  dateFormat?: string;
  size?: string;
  frequency?: number | 'daily' | 'hourly';
}

const defaultLoggerConfig: Required<LoggerConfig> = {
  PrettierLogLevel: 'debug',
  RollerLogLevel: 'info',
  dateFormat: 'SYS:yyyy-MM-dd HH:mm:ss',
  frequency: 'daily',
  size: '10m',
};
//#endregion

export interface ConfigDefType {
  base: BaseConfig;
  logger?: LoggerConfig;
}

export type ConfigType = DeepRequire<ConfigDefType>;

export const getAllConfig = () => {
  const config = process.env.NODE_ENV == 'production' ? ProdConfig : DevConfig;
  config.logger = {
    ...defaultLoggerConfig,
    ...config.logger,
  };

  const conf: DeepRequire<ConfigType> = {
    base: {
      ...defaultBaseConfig,
      ...config.base,
    },
    logger: {
      ...defaultLoggerConfig,
      ...config?.logger,
    },
  };

  return conf;
};
