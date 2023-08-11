/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { BaseService } from '../base/base.service'
import { BaseResponse } from '../base/base.response'

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    repository: UserRepository,
    @InjectPinoLogger(UserService.name)
    private readonly logger: PinoLogger,
  ) {
    super(repository)
  }

  async getProfile(user: User): Promise<BaseResponse<User>> {
    return {
      data: await this.repository.findById(user.id),
    }
  }
}
