import { Entity,Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_actions')
export class Action {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  action_name: string;
}
