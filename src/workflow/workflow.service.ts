import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { Workflow, WorkFlowDetals } from './entities/workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowService: Repository<Workflow>,
    @InjectRepository(WorkFlowDetals)
    private readonly workflowDetailsService: Repository<WorkFlowDetals>,
  ) {}
  async create(createWorkflowDto: CreateWorkflowDto) {
    try {
      let { work_flow_id, role_id, document_id, workflow_details_array } =
        createWorkflowDto;
      await this.workflowService.save({
        work_flow_id,
        role_id,
        document_id,
      });
      await this.workflowDetailsService.save(workflow_details_array);
    } catch (error) {}
  }

  findAll() {
    return `This action returns all workflow`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workflow`;
  }

  update(id: number, updateWorkflowDto: UpdateWorkflowDto) {
    return `This action updates a #${id} workflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} workflow`;
  }
}
