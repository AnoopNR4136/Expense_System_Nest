import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { CreateQueryModuleDto } from './dto/create-query-module.dto';
import { UpdateQueryModuleDto } from './dto/update-query-module.dto';

@Injectable()
export class QueryModuleService {
  create(createQueryModuleDto: CreateQueryModuleDto) {
    return 'This action adds a new queryModule';
  }

  getEmployeeForWorkFlow(docID: number, empID: string) {
    let manager = getManager();
    return manager.query(
      `
     SELECT * FROM tbl_employees WHERE employee_id IN  (
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
                    AND document_id=${docID}
                    )
                AND status='Start'	
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
