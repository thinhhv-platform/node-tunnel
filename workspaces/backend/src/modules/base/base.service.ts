/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */
import { BaseEntity, DeleteResult, FindOptionsWhere, In, Repository } from 'typeorm'

import { TypeOrmModuleHelper } from '../_shared/databases/typeorm.helper'
import { IBaseService } from './interfaces/base.service.interface'

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
  protected readonly repository: R

  constructor(repository: R) {
    this.repository = repository
  }

  index(): Promise<T[]> {
    return this.repository.find()
  }

  findById(id: any): Promise<T> {
    return this.repository.findOneBy(TypeOrmModuleHelper.transformCollectionId(id))
  }

  findByIds(ids: any[]): Promise<T[]> {
    return this.repository.findBy({
      id: In(ids.map((e) => TypeOrmModuleHelper.transformCollectionId(e))),
    } as FindOptionsWhere<any>)
  }

  store(data: any): Promise<T> {
    return this.repository.save(TypeOrmModuleHelper.transformObjectId(data))
  }

  async update(id: any, data: any): Promise<T> {
    await this.repository.update(
      TypeOrmModuleHelper.transformCollectionId(id),
      TypeOrmModuleHelper.transformObjectId(data),
    )
    return this.findById(id)
  }

  delete(id: any): Promise<DeleteResult> {
    return this.repository.delete(TypeOrmModuleHelper.transformCollectionId(id))
  }

  deleteMany(ids: any[]): Promise<DeleteResult> {
    return this.repository.delete(TypeOrmModuleHelper.transformObjectId(ids))
  }
}
