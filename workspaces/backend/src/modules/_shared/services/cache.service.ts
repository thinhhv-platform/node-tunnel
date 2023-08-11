/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

import { Cache } from 'cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async setKey(key: string, data: string, date: number): Promise<void> {
    await this.cacheManager.set(key, data, date)
  }

  public getKey(key: string): Promise<string | undefined> {
    return this.cacheManager.get(key)
  }

  public removeKey(key: string): Promise<any> {
    return this.cacheManager.del(key)
  }

  public resetAll(): Promise<any> {
    return this.cacheManager.reset()
  }
}
