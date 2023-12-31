/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */
import { applyDecorators } from '@nestjs/common'
import config from 'src/common/config'
import { DATABASE_CLIENT } from 'src/common/constants'
import { Column, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm'

export const PrimaryColumn = (args: any = {}) => {
  if (config.database.client === DATABASE_CLIENT.MONGODB) {
    return applyDecorators(ObjectIdColumn({ primary: true, type: 'varchar', ...args }))
  }
  return applyDecorators(PrimaryGeneratedColumn(args))
}

export const IdColumn = (args: any = {}) => {
  return applyDecorators(
    config.database.client === DATABASE_CLIENT.MONGODB
      ? ObjectIdColumn({ type: 'varchar', ...args })
      : Column({ type: 'integer', ...args }),
  )
}
