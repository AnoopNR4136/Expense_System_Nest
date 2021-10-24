import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_doc_role_permission')
export class DocumentRolePermission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role_id: number;
  @Column()
  permission_id: number;
  @Column()
  document_id: number;
}
