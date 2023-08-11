/**
 * @since 2023/08/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 ThinhHV Platform
 */

import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'email',
    default: '',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'username',
    default: '',
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'password',
    default: '',
  })
  password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'firstName',
    default: '',
  })
  firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'lastName',
    default: '',
  })
  lastName: string
}

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'firstName',
    default: '',
  })
  firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'lastName',
    default: '',
  })
  lastName: string
}

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'username or email',
    default: '',
  })
  account: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'password',
    default: '',
  })
  password: string
}
