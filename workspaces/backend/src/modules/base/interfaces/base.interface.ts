/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

export interface IPagination<T = any> {
  items: T[]
  totalItem: number
  limit: number
  totalPages
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number
  nextPage: number
}
