export class EmployeeRoleBranch {
  employee_id: string;

  branch_id: number;

  role_id: number;
}

export class EmployeeHeadsRoleBranch {
  employee_id: string; 
   employee_head_id: string; //from employee table

  role_id: number; //Head role
branch_id: number;
}