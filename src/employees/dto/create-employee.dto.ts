import {
  EmployeeRoleBranch,
  EmployeeHeadsRoleBranch,
} from './employee_role_branch';
export class CreateEmployeeDto {
  employee_name: string;
  employee_id: string;

  emp_branch_role: Array<EmployeeRoleBranch>;
  emp_heads: Array<EmployeeHeadsRoleBranch>;
}
