/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */
import { Logger } from '@nestjs/common'
import { Params } from 'nestjs-pino'
import pino from 'pino'
import { ACCESS_TOKEN_HEADER_NAME, NODE_ENV } from 'src/common/constants'
import { Logger as DbLogger, QueryRunner } from 'typeorm'

const PROD_MASK_PATH = [`req.headers["${ACCESS_TOKEN_HEADER_NAME}"]`]
const DEBUG_MASK_PATH = [`req.headers["${ACCESS_TOKEN_HEADER_NAME}"]`]

export function loggerConfig(env: string, auto: boolean): Params {
  return {
    pinoHttp: {
      level: env !== NODE_ENV.PROD ? 'debug' : 'info',
      redact: {
        paths: env !== NODE_ENV.PROD ? DEBUG_MASK_PATH : PROD_MASK_PATH,
        censor: '***',
      },
      ...(env !== NODE_ENV.PROD
        ? {
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
          }
        : {}),
      serializers: {
        err: pino.stdSerializers.err,
        req: (req) => {
          req.body = req.raw.body
          return req
        },
      },
      autoLogging: auto,
    },
  }
}

export class TypeormLogger implements DbLogger {
  private readonly logger = new Logger(TypeormLogger.name)

  _log(name: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const requestUrl =
      queryRunner && queryRunner.data['request'] ? '(' + queryRunner.data['request'].url + ') ' : ''
    this.logger.log(`${requestUrl}Executing query: (${query}) Parameters: (${parameters})`)
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this._log('logQuery', query, parameters, queryRunner)
  }

  logQueryError(
    error: string | Error,
    query: string,
    _parameters?: any[],
    _queryRunner?: QueryRunner,
  ) {
    this.logger.error({ error, query: 'Executing query: ' + query })
  }

  logQuerySlow(_time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this._log('logQuerySlow', query, parameters, queryRunner)
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this._log('logSchemaBuild ' + message, '', [], queryRunner)
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this._log('logMigration ' + message, '', [], queryRunner)
  }

  log(level: 'log' | 'warn' | 'info', message: any, queryRunner?: QueryRunner) {
    const requestUrl =
      queryRunner && queryRunner.data['request'] ? '(' + queryRunner.data['request'].url + ') ' : ''
    this.logger.log(`${level} Message: ${message}, requestUrl: ${requestUrl}`)
  }
}
