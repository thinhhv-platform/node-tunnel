import { Controller, Get } from '@nestjs/common';
import { TunnelService } from './tunnel.service';

@Controller()
export class TunnelController {
  constructor(private readonly service: TunnelService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
