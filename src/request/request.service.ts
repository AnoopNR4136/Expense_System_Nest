import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestDetails, Requests } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Requests)
    private readonly requestService: Repository<Requests>,
    @InjectRepository(RequestDetails)
    private readonly requestDetailsService: Repository<RequestDetails>,
  ) {}

  async postRequest(createRequestDto: CreateRequestDto) {
    let manager = getManager();
    let result = await manager.query(
      `
  SELECT 
        tbl_workflow.work_flow_id 
  FROM 
        tbl_workflow 
INNER JOIN 
        tbl_workflow_details 
ON tbl_workflow_details.work_flow_id = tbl_workflow.work_flow_id
WHERE 
      tbl_workflow.role_id IN 
	          (SELECT 
                role_id 
            FROM tbl_emp_role_branch 
		          WHERE employee_id='EMP_2739510000')
AND tbl_workflow.document_id=8
AND tbl_workflow_details.to_role=8 
AND tbl_workflow_details.status='Start'

  `,
    );
    let work_flow_id = result[0].work_flow_id;
    console.log(result);

    let { employee_id, document_id, notes, to_employee_id } = createRequestDto;
    try {
      let reqData = await this.requestService.save({
        employee_id,
        document_id,
        notes,
        work_flow_id,
      });

      await this.requestDetailsService.save({
        request_id: reqData.request_id,
        to_employee_id: to_employee_id,
      });
    } catch (error) {}
  }

  findAll() {
    return `This action returns all request`;
  }

  pendingRequest(id: string) {
    try {
    } catch (error) {}
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
