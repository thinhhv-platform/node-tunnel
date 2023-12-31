/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

import { Column, Entity, Unique } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseEntity } from '../base/base.entity'
import { Role } from '../auth/enums/role.enum'

@Entity({ name: 'users' })
export class User extends BaseEntity<User> {
  @Unique(['email'])
  @Column()
  email: string

  @Column()
  @Unique(['username'])
  username: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Exclude()
  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: Role.User })
  role: string

  @Column({ default: Role.User })
  roles: string

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
