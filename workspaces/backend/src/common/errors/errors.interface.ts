/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */
import { HttpStatus } from '@nestjs/common'

export interface IError {
  message: string
  errorCode: string
  description: string
  statusCode: HttpStatus
  stackTrace?: any
}
