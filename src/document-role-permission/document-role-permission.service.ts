import { Injectable } from '@nestjs/common';
import { CreateDocumentRolePermissionDto } from './dto/create-document-role-permission.dto';
import { UpdateDocumentRolePermissionDto } from './dto/update-document-role-permission.dto';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRolePermission } from './entities/document-role-permission.entity';

@Injectable()
export class DocumentRolePermissionService {
  constructor(
    @InjectRepository(DocumentRolePermission)
    private readonly documentRolePermissionService: Repository<DocumentRolePermission>,
  ) {}

  async create(
    createDocumentRolePermissionDto: CreateDocumentRolePermissionDto,
  ) {
    try {
      return await this.documentRolePermissionService.save(
        createDocumentRolePermissionDto,
      );
    } catch (error) {
      console.log(error);
    }
  }

  getDocRolePermission() {
    try {
      let manager = getManager();
      return manager.query(`
    SELECT COALESCE(permission_name,'submit') as permission_name,role_name,document_name FROM tbl_doc_role_permission
	LEFT JOIN tbl_permissions
		ON tbl_permissions.permission_id = tbl_doc_role_permission.permission_id
	INNER JOIN tbl_role
		ON tbl_role.role_id = tbl_doc_role_permission.role_id
	INNER JOIN tbl_document
		ON tbl_document.document_id =tbl_doc_role_permission.document_id
    `);
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} documentRolePermission`;
  }

  update(
    id: number,
    updateDocumentRolePermissionDto: UpdateDocumentRolePermissionDto,
  ) {
    return `This action updates a #${id} documentRolePermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentRolePermission`;
  }
}
