import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async createRole(createRoleDto: CreateRoleDto) {
    try {
      return await this.roleRepository.save({ ...createRoleDto });
    } catch (error) {}
  }

  async viewRole(): Promise<Role[]> {
    try {
      const manager = getManager();
      return await manager.query(`SELECT *  FROM tbl_role`);
    } catch (error) {
      console.log(error);
    }
  }
  async viewHeigherRoles(id: number) {
    const manger = getManager();
    console.log(id);

    try {
      // return await manger.query(
      //   `
      //   // SELECT * FROM tbl_role WHERE role_id in
      //   //          (SELECT unnest(string_to_array(role_heads,',')::int[])
      //   //          FROM tbl_role where role_id =${id})
      // `,
      // );
    } catch (error) {}
  }

  async findOne(id: number) {
    // try {
    //   let manager = getManager();
    //   return await manager.query(
    //     `SELECT role_id,role_name FROM tbl_role WHERE role_id IN (
    //   SELECT unnest(string_to_array(role_heads,',')::int[]) FROM tbl_role WHERE role_id=${id})`,
    //   );
    // } catch (error) {}
  }

  update(id: number, updateroleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
