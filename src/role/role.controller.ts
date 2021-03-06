import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('addrole')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get('viewRole')
  viewRole() {
    return this.roleService.viewRole();
  }

  @Get('get_role_by_empID_branch_id/:empid/:branchid')
  getRoleByEmpIdBranchId(
    @Param('empid') empid: string,
    @Param('branchid') branchid: number,
  ) {
    return this.roleService.getRoleByEmpIdBranchId(empid, branchid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
