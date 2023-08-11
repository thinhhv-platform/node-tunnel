/**
 * @since 2022/12/21
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

import { IsDefined, IsNotEmpty, IsString } from 'class-validator'

export class PermissionDto {
  action: Array<string>
}

export class CommonIdParams {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  id: string
}
