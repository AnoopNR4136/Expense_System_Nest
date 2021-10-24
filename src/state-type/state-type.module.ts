import { Module } from '@nestjs/common';
import { StateTypeService } from './state-type.service';
import { StateTypeController } from './state-type.controller';

@Module({
  controllers: [StateTypeController],
  providers: [StateTypeService]
})
export class StateTypeModule {}
