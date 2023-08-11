/**
 * @since 2022/12/02
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */
import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { RoleAdmin } from 'src/common/decorators/role.decorator'
import { ApiErrorResponses } from 'src/modules/_shared/sample.decorator'
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard'

export function Auth(): MethodDecorator & ClassDecorator {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth(), ApiErrorResponses())
}

export function AuthAdmin(): MethodDecorator & ClassDecorator {
  return applyDecorators(Auth(), RoleAdmin())
}
