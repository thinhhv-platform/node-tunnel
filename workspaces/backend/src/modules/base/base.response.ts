/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */
import { Pagination } from 'nestjs-typeorm-paginate'

export class BaseResponsePagination<T> extends Pagination<T> {}

export class BaseResponse<T> {
  data: T
}
