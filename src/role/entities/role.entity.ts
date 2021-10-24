import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  role_name: string;
}