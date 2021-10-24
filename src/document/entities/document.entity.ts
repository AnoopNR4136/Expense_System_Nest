import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tbl_document')
export class DocumentType extends BaseEntity {
  @PrimaryGeneratedColumn()
  document_id: number;
  @Column()
  document_name: string;
}
