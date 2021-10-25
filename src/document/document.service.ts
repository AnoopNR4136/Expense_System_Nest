import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentType } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentService: Repository<DocumentType>,
  ) {}
  async create(createDocumentDto: CreateDocumentDto) {
    try {
      return await this.documentService.save({ ...createDocumentDto });
    } catch (error) {}
  }

  async findAll() {
    return await this.documentService.find();
  }

  async getDocByRoleId(id: number) {
    try {
      const manager = getManager();
      return manager.query(`
      SELECT * FROM tbl_document 
	      INNER JOIN tbl_role_doc
	      ON tbl_document.document_id = tbl_role_doc.document_id
      WHERE role_id=${id}
	
      `);
    } catch (error) {}
  }
  async getDocByUserId(id: string) {
    const manager = getManager();
    return await manager.query(`
    SELECT * FROM tbl_document 
	      INNER JOIN tbl_role_doc
	      ON tbl_document.document_id = tbl_role_doc.document_id
      WHERE role_id=(SELECT role_id FROM tbl_emp_role_branch WHERE employee_id ='${id}')
      
      
      `);
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
