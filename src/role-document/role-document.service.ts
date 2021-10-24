import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateRoleDocumentDto } from './dto/create-role-document.dto';
import { UpdateRoleDocumentDto } from './dto/update-role-document.dto';
import { RoleDocument } from './entities/role-document.entity';

@Injectable()
export class RoleDocumentService {
  constructor(
    @InjectRepository(RoleDocument)
    private readonly roleDocumentService: Repository<RoleDocument>,
  ) {}
  async create(createRoleDocumentDto: CreateRoleDocumentDto) {
    try {
      return await this.roleDocumentService.save(createRoleDocumentDto);
    } catch (error) {
      console.log(error);
    }
  }

  getRoleDoc() {
    try {
      let manager = getManager();
      return manager.query(
        `
        SELECT * FROM tbl_role_doc
	INNER JOIN tbl_role ON tbl_role.role_id = tbl_role_doc.role_id
	INNER JOIN tbl_document ON tbl_document.document_id = tbl_role_doc.document_id
        `,
      );
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} roleDocument`;
  }

  update(id: number, updateRoleDocumentDto: UpdateRoleDocumentDto) {
    return `This action updates a #${id} roleDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleDocument`;
  }
}
