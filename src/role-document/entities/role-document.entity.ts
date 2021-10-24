import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_role_doc')
export class RoleDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_id: number;

  @Column()
  document_id: number;
}
