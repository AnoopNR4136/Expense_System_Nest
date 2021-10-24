import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_employees')
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  employee_id: string;

  @Column()
  employee_name: string;

  // @Column('int', { array: true, default: 0 })
  // array: number[];
}

@Entity('tbl_emp_role_branch')
export class EmployeeBranchRole {
  @PrimaryGeneratedColumn()
  employee_role_branch_id: number;
  @Column()
  role_id: number;

  @Column()
  employee_id: string;

  @Column()
  branch_id: number;
}
