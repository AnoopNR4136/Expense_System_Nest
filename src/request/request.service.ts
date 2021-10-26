import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateRequestDto, RequestDetailsDTO } from './dto/create-request.dto';
import {
  CompleteUpdateStatus,
  UpdateRequestDto,
} from './dto/update-request.dto';
import {
  RequestDetails,
  RequestDetailsActions,
  Requests,
} from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Requests)
    private readonly requestService: Repository<Requests>,
    @InjectRepository(RequestDetailsActions)
    private readonly requestDetailsActionsService: Repository<RequestDetailsActions>,
    @InjectRepository(RequestDetails)
    private readonly requestDetailsService: Repository<RequestDetails>,
  ) {}

  async postRequest(createRequestDto: CreateRequestDto) {
    try {
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
		          WHERE employee_id='${createRequestDto.employee_id}')
AND tbl_workflow.document_id='${createRequestDto.document_id}'
AND tbl_workflow_details.to_role=(SELECT role_id FROM tbl_emp_role_branch WHERE employee_id ='${createRequestDto.to_employee_id}' )
AND tbl_workflow_details.status='Start'
  `,
      );
      let work_flow_id = result[0].work_flow_id;
      console.log(result);

      let { employee_id, document_id, notes, to_employee_id } =
        createRequestDto;

      let reqData = await this.requestService.save({
        employee_id,
        document_id,
        notes,
        work_flow_id,
      });

      await this.requestDetailsService.save({
        request_id: reqData.request_id,
        to_employee_id: to_employee_id,
        from_employee_id: employee_id, //Posted user
        notes,
      });
    } catch (error) {}
  }

  async postRequestDetails(createRequestDetailsDto: RequestDetailsDTO) {
    try {
      let {
        requestdetailsID,
        permission_id,
        request_id,
        from_employee_id,
        to_employee_id,
        notes,
        action,
      } = createRequestDetailsDto;
      let manager = getManager();
      let isTransfer = 0;

      if (action != 0) {
        let result = await this.requestDetailsActionsService.save({
          action_id: action,
          request_details_id: requestdetailsID,
        });
      } else {
        isTransfer = 1;
        let result = await this.requestDetailsService.save({
          request_id,
          from_employee_id,
          to_employee_id,
          notes,
        });
      }
      await manager.query(
        `
UPDATE tbl_request_details SET permission_id='${permission_id}',transfer_status='${isTransfer}' WHERE request_details_id='${requestdetailsID}' 

`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async ViewAllPendigRequest(id) {
    try {
      let manager = getManager();
      return await manager.query(
        `
SELECT * FROM tbl_request_details
INNER JOIN tbl_employees ON tbl_employees.employee_id = tbl_request_details.from_employee_id
INNER JOIN tbl_request ON tbl_request.request_id = tbl_request_details.request_id
INNER JOIN tbl_document ON tbl_document.document_id = tbl_request.document_id							
WHERE to_employee_id ='${id}' AND tbl_request_details.permission_id='0'
`,
      );
    } catch (error) {}
  }

  async ViewAllOnWorkRequest(id) {
    try {
      let manager = getManager();
      return await manager.query(
        `
SELECT * FROM tbl_request_details
INNER JOIN tbl_employees ON tbl_employees.employee_id = tbl_request_details.from_employee_id
INNER JOIN tbl_request ON tbl_request.request_id = tbl_request_details.request_id
INNER JOIN tbl_document ON tbl_document.document_id = tbl_request.document_id							
WHERE to_employee_id ='${id}' AND tbl_request_details.transfer_status='0' AND tbl_request_details.permission_id!='0'
`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getNextEmpOfWorkFlow(
    permissionid: number,
    employee_id: string,
    workflowID: number,
    role: number,
    branch: number,
  ) {
    try {
      let manager = getManager();

      let result = await manager.query(
        `
       SELECT * FROM tbl_employees WHERE employee_id IN
(SELECT employee_id FROM tbl_emp_head WHERE  branch_id = ${branch}  AND employee_head_id='${employee_id}'   AND employee_id   IN(SELECT tbl_employees.employee_id FROM tbl_employees
INNER JOIN tbl_emp_role_branch ON tbl_employees.employee_id = tbl_emp_role_branch.employee_id
WHERE tbl_emp_role_branch.role_id IN (SELECT to_role FROM tbl_workflow_details WHERE work_flow_id=${workflowID} AND from_role IN (SELECT role_id FROM tbl_emp_role_branch WHERE employee_id='${employee_id}')
AND permission_id=${permissionid}))
UNION
 SELECT employee_head_id FROM tbl_emp_head WHERE branch_id = ${branch} AND employee_id='${employee_id}' AND employee_head_id IN(SELECT tbl_employees.employee_id FROM tbl_employees
INNER JOIN tbl_emp_role_branch ON tbl_employees.employee_id = tbl_emp_role_branch.employee_id
WHERE tbl_emp_role_branch.role_id IN (SELECT to_role FROM tbl_workflow_details WHERE work_flow_id=90733 AND from_role IN (SELECT role_id FROM tbl_emp_role_branch WHERE employee_id='${employee_id}')
AND permission_id=${permissionid})))
      `,
      );
      console.log(result);

      if (result.length) {
        return {
          type: 'Employee',
          details: result,
        };
      } else {
        let isComplete = await manager.query(
          `
SELECT status FROM tbl_workflow_details 
WHERE work_flow_id=${workflowID} AND permission_id=${permissionid} 
AND from_role IN 
(SELECT role_id FROM tbl_emp_role_branch WHERE employee_id='${employee_id}')



`,
        );

        if (isComplete[0].status == 'Complete') {
          return {
            type: 'Complete',
          };
        } else {
          let data = await manager.query(
            `
      SELECT * FROM tbl_actions
          `,
          );

          return {
            type: 'Acton',
            details: data,
          };
        }
      }
    } catch (error) {}
  }

  async CompleteUpdate(updateStatus: CompleteUpdateStatus) {
    console.log('CompleteUpdate');
    try {
      let manager = getManager();
      await manager.query(
        `
UPDATE tbl_request SET status=${updateStatus.status} WHERE request_id = ${updateStatus.id}

`,
      );
      await manager.query(`
      UPDATE tbl_request_details SET whole_status=1 WHERE request_id = ${updateStatus.id}
      `);

      await manager.query(`
      UPDATE tbl_request_details SET permission_id =${updateStatus.status} WHERE request_details_id = ${updateStatus.requestdetailsID}
      `);
    } catch (error) {}
  }
  // ,
  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
