import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_branch')
export class Branch {
  @PrimaryGeneratedColumn()
  branch_id: number;
  @Column()
  branch_name: string;
}
