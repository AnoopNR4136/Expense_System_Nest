import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_permissions')
export class Permisssions {
  @PrimaryGeneratedColumn()
  permission_id: number;
  @Column()
  permission_name: string;
  @Column()
  permission_after: string;
}
