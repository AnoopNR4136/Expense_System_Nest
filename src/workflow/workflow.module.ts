import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow, WorkFlowDetals } from './entities/workflow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow, WorkFlowDetals])],
  controllers: [WorkflowController],
  providers: [WorkflowService],
})
export class WorkflowModule {}
