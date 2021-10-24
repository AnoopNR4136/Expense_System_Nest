import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateDocumentPermissionDto } from './dto/create-document-permission.dto';
import { UpdateDocumentPermissionDto } from './dto/update-document-permission.dto';
import { DocumentPermission } from './entities/document-permission.entity';

@Injectable()
export class DocumentPermissionService {
  constructor(
    @InjectRepository(DocumentPermission)
    private readonly documentPermissionService: Repository<DocumentPermission>,
  ) {}
  async create(createDocumentPermissionDto: CreateDocumentPermissionDto) {
    try {
      return await this.documentPermissionService.save(
        createDocumentPermissionDto,
      );
    } catch (error) {}
  }

  findAll() {
    return `This action returns all documentPermission`;
  }

  async getPermissionByDocumentId(id: number) {
    try {
      let manager = getManager();
      return await manager.query(
        `SELECT * FROM tbl_doc_permission 
	          INNER JOIN tbl_permissions  
		        ON tbl_doc_permission.permission_id  =tbl_permissions.permission_id
         WHERE document_id=${id}`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateDocumentPermissionDto: UpdateDocumentPermissionDto) {
    return `This action updates a #${id} documentPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentPermission`;
  }
}
