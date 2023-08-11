import { Module } from '@nestjs/common';
import { TunnelController } from './tunnel.controller';
import { TunnelService } from './tunnel.service';

@Module({
  imports: [],
  controllers: [TunnelController],
  providers: [TunnelService],
})
export class TunnelModule {}
