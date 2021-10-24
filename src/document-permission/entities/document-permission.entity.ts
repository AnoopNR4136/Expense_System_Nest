import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_doc_permission')
export class DocumentPermission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  document_id: number;
  @Column()
  permission_id: number;
}
