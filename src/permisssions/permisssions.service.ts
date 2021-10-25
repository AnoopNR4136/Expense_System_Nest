import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreatePermisssionDto } from './dto/create-permisssion.dto';
import { UpdatePermisssionDto } from './dto/update-permisssion.dto';
import { Permisssions } from './entities/permisssion.entity';

@Injectable()
export class PermisssionsService {
  constructor(
    @InjectRepository(Permisssions)
    private readonly permissionService: Repository<Permisssions>,
  ) {}
  async create(createPermisssionDto: CreatePermisssionDto) {
    return await this.permissionService.save({ ...createPermisssionDto });
  }

  async findAll() {
    try {
      return await this.permissionService.find();
    } catch (error) {}
  }

  async getPermissionByRoleDoc(doc: number, role: number) {
    try {
      let manager = getManager();
      return await manager.query(`
        SELECT * FROM tbl_doc_role_permission 
          	NATURAL JOIN tbl_permissions
        WHERE role_id=${role} AND document_id=${doc}    `);
    } catch (er) {
      console.log(er);
    }
  }
  async getPermissionByUserDoc(doc: number, user: string) {
    try {
      let manager = getManager();
      return await manager.query(`
        SELECT * FROM tbl_permissions WHERE permission_id IN
(SELECT permission_id FROM tbl_doc_role_permission WHERE role_id=
 (SELECT role_id FROM tbl_emp_role_branch WHERE employee_id ='${user}')
 AND document_id=${doc}
)`);
    } catch (er) {
      console.log(er);
    }
  }
  async eligiblityCheck(doc: number, role: number) {
    try {
      let manager = getManager();
      return await manager.query(`
        SELECT * FROM tbl_doc_role_permission 
            WHERE role_id=${role} 
            AND document_id=${doc} 
            AND permission_id=0  
            `);
    } catch (er) {
      console.log(er);
    }
  }

  async ViewDocPermisssions() {
    let manager = getManager();
    return await manager.query(`
SELECT id,document_name,permission_name FROM tbl_doc_permission
	INNER JOIN tbl_document ON tbl_document.document_id = tbl_doc_permission.document_id
	INNER JOIN tbl_permissions ON tbl_permissions.permission_id = tbl_doc_permission.permission_id
	
`);
  }

  update(id: number, updatePermisssionDto: UpdatePermisssionDto) {
    return `This action updates a #${id} permisssion`;
  }

  remove(id: number) {
    return `This action removes a #${id} permisssion`;
  }
}
