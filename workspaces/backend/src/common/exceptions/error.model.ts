/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class ErrorModel {
  @ApiProperty()
  @IsString()
  statusCode: string

  @ApiProperty()
  @IsString()
  message: string

  @ApiProperty()
  @IsString()
  timestamp: string

  @ApiProperty()
  @IsString()
  path: string
}
