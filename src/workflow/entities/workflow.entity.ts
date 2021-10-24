import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_workflow')
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  work_flow_id: number;
  @Column()
  role_id: number;
  @Column()
  document_id: number;
}

@Entity('tbl_workflow_details')
export class WorkFlowDetals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  work_flow_id: number;

  @Column()
  from_role: number;

  @Column()
  to_role: number;
  @Column()
  permission_id: number;
  @Column()
  status: string;
}
