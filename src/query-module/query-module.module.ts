import { Module } from '@nestjs/common';
import { QueryModuleService } from './query-module.service';
import { QueryModuleController } from './query-module.controller';

@Module({
  controllers: [QueryModuleController],
  providers: [QueryModuleService]
})
export class QueryModuleModule {}
