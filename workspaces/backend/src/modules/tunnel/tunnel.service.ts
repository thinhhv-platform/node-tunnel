import { Injectable } from '@nestjs/common'

@Injectable()
export class TunnelService {
  getHello(): string {
    return 'Hello World!'
  }
}
