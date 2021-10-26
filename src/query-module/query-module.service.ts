import { Injectable } from '@nestjs/common';
import { doc } from 'prettier';
import { getManager } from 'typeorm';
import { CreateQueryModuleDto } from './dto/create-query-module.dto';
import { UpdateQueryModuleDto } from './dto/update-query-module.dto';

@Injectable()
export class QueryModuleService {
  create(createQueryModuleDto: CreateQueryModuleDto) {
    return 'This action adds a new queryModule';
  }

  getEmployeeForWorkFlow(
    doc: number,
    empID: string,
    role: number,
    branch: number,
  ) {
    let manager = getManager();
    return manager.query(
      `
     



	
 SELECT * FROM tbl_employees WHERE employee_id IN  (
	 
(SELECT employee_id FROM tbl_emp_head WHERE   branch_id =${branch} AND employee_head_id ='${empID}' AND employee_id IN	 
	 
(SELECT
employee_id
FROM tbl_emp_role_branch
WHERE
  role_id IN(
              SELECT to_role FROM tbl_workflow_details
              WHERE work_flow_id IN
                    (
                      SELECT work_flow_id FROM tbl_workflow
                      WHERE role_id IN
                        (
                          SELECT
                                       role_id
                              FROM
                                      tbl_emp_role_branch
                          WHERE
                                      employee_id='${empID}'
                        )
                    AND document_id=${doc}
                    )
                AND status='Start'
              ))
 
 UNION
 SELECT employee_head_id FROM tbl_emp_head WHERE  branch_id =${branch} AND employee_id ='${empID}' AND employee_head_id IN(
 SELECT
employee_id
FROM tbl_emp_role_branch
WHERE
  role_id IN(
              SELECT to_role FROM tbl_workflow_details
              WHERE work_flow_id IN
                    (
                      SELECT work_flow_id FROM tbl_workflow
                      WHERE role_id IN
                        (
                          SELECT
                                       role_id
                              FROM
                                      tbl_emp_role_branch
                          WHERE
                                      employee_id='${empID}'
                        )
                    AND document_id=${doc}
                    )
                AND status='Start'
              ))
 
))

  `,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} queryModule`;
  }

  update(id: number, updateQueryModuleDto: UpdateQueryModuleDto) {
    return `This action updates a #${id} queryModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} queryModule`;
  }
}
