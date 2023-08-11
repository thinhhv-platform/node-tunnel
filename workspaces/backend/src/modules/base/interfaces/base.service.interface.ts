/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */
import { DeleteResult } from 'typeorm'
import { EntityId } from 'typeorm/repository/EntityId'

export interface IBaseService<T> {
  index(): Promise<T[]>
  findById(id: EntityId): Promise<T>
  findByIds(id: [EntityId]): Promise<T[]>
  store(data: any): Promise<T>
  update(id: EntityId, data: any): Promise<T>
  delete(id: EntityId): Promise<DeleteResult>
}
