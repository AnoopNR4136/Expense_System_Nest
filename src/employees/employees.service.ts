import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  Employee,
  EmployeeBranchRole,
  EmployeeHeads,
} from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeBranchRole)
    private readonly employeeRoleBranchRepository: Repository<EmployeeBranchRole>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeHeads)
    private readonly employeeHeadsRepository: Repository<EmployeeHeads>,
  ) {}
  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    try {
      let { employee_name, employee_id, emp_branch_role } = createEmployeeDto;

      await this.employeeRoleBranchRepository.save(emp_branch_role);

      if (createEmployeeDto.emp_heads.length) {
        await this.employeeHeadsRepository.save(createEmployeeDto.emp_heads);
      }
      return await this.employeeRepository.save({
        employee_name,
        employee_id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllEmployees() {
    try {
      const manager = getManager();
      return await manager.query(
        `SELECT * FROM tbl_employees LEFT JOIN tbl_role ON tbl_employees.role_id = tbl_role.role_id`,
      );
    } catch (error) {}
    //return `This action returns all employees`;
  }
  async getEmpDocCeateWorkFlow(id: string) {
    try {
      const manager = getManager();
      return await manager.query(
        `SELECT 
                	* 
        FROM 
	            tbl_document 
        WHERE 
              document_id IN(
                SELECT  
                     document_id
                FROM 	
                      tbl_doc_role_permission 
                WHERE 	
                       role_id IN (SELECT role_id FROM tbl_emp_role_branch  WHERE employee_id='${id}')
                        AND tbl_doc_role_permission.permission_id='0'
											   )`,
      );
    } catch (error) {}
  }

  async getEmployeeByBranchAndRole(branch_id: number, role_id: number) {
    try {
      let manager = getManager();
      return await manager.query(
        `
        SELECT * FROM tbl_employees 
INNER JOIN tbl_emp_role_branch
ON tbl_employees.employee_id = tbl_emp_role_branch.employee_id
WHERE tbl_emp_role_branch.branch_id = ${branch_id}
AND tbl_emp_role_branch.role_id=${role_id}
        
        
        `,
      );
    } catch (error) {}
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
