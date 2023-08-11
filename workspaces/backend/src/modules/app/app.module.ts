/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import { LoggerModule } from 'nestjs-pino'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModuleConfig } from 'src/modules/_shared/databases/typeorm.config'
import { SharedModule } from 'src/modules/_shared/shared.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import config from 'src/common/config'
import { join } from 'path'
import { loggerConfig } from 'src/helpers/logger.helper'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import AnyExceptionFilter from 'src/common/filters/any-exception.filter'
import { BaseTransformInterceptor } from '../../common/interceptors/transform.interceptor'

const imports = [
  LoggerModule.forRootAsync({
    useFactory: () =>
      loggerConfig(process.env.NODE_ENV || config.nodeEnv, config.logger.autoLogging),
  }),
  EventEmitterModule.forRoot(),
  CacheModule.register(config.cacheConfig),
  ServeStaticModule.forRoot({
    rootPath: process.env.APP_CLIENT_DIR || join(__dirname, '../../../../', 'frontend', 'out'),
    exclude: [config.baseUrl + '*', config.swagger.baseUrl + '*'],
    serveStaticOptions: {
      extensions: ['html'],
    },
  }),
  DiscoveryModule,
  TypeOrmModule.forRootAsync({ useClass: TypeOrmModuleConfig }),
  SharedModule,
  AuthModule,
  UserModule,
]

@Module({
  imports,
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseTransformInterceptor,
    },
  ],
})
export class AppModule {}
