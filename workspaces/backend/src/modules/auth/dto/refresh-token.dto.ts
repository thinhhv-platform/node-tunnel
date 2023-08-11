/**
 * @since 2022/12/01
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string
}
