import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('tbl_request')
export class Requests {
  @PrimaryGeneratedColumn()
  request_id: number;
  @Column()
  employee_id: string;
  @Column()
  document_id: number;
  @Column()
  work_flow_id: number;
  @Column({ default: 0 })
  status: 0;
  @Column()
  notes: string;
  @CreateDateColumn()
  posted_date: Date;
}

@Entity('tbl_request_details')
export class RequestDetails {
  @PrimaryGeneratedColumn()
  request_details_id: number;
  @Column()
  request_id: number;

  @Column()
  from_employee_id: string;

  @Column({ default: 0 })
  to_employee_id: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: 0 })
  permission_id: number;
  @Column({ default: 0 })
  whole_status: number; //0 on work 1 complete

  @Column({ default: 0 })
  transfer_status: number; //0 hold 1 transfer
  @CreateDateColumn()
  update_date: Date;
  @UpdateDateColumn()
  posted_date: Date;
}
@Entity('tbl_request_details_actions')
export class RequestDetailsActions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  request_details_id: number;
  @Column()
  action_id: number;
  @CreateDateColumn()
  update_date: Date;
  @UpdateDateColumn()
  posted_date: Date;
}
