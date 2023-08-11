/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BaseRequest<T> {
  keyword?: string

  status?: string

  page?: number

  perPage?: number

  sortDate?: string

  startDate?: Date

  endDate?: Date
}
