/**
 * @since 2022/12/22
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */
import { applyDecorators } from '@nestjs/common'
import { IsMongoId, IsNumber } from 'class-validator'
import config from 'src/common/config'
import { DATABASE_CLIENT } from 'src/common/constants'

export const IsColumnId = (args?: any) => {
  return applyDecorators(
    config.database.client === DATABASE_CLIENT.MONGODB
      ? IsMongoId(args)
      : IsNumber(args, { message: ({ property }) => `${property} is invalid` }),
  )
}
