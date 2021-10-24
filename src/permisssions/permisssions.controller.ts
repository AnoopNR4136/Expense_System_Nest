import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermisssionsService } from './permisssions.service';
import { CreatePermisssionDto } from './dto/create-permisssion.dto';
import { UpdatePermisssionDto } from './dto/update-permisssion.dto';

@Controller('permisssions')
export class PermisssionsController {
  constructor(private readonly permisssionsService: PermisssionsService) {}

  @Post('addpermisssion')
  create(@Body() createPermisssionDto: CreatePermisssionDto) {
    return this.permisssionsService.create(createPermisssionDto);
  }

  @Get('Viewpermisssions')
  findAll() {
    return this.permisssionsService.findAll();
  }

  @Get('ViewDocPermisssions')
  ViewDocPermisssions() {
    return this.permisssionsService.ViewDocPermisssions();
  }

  @Get('get_permission_by_role_doc/:role/:doc')
  getPermissionByRoleDoc(
    @Param('role') role: number,
    @Param('doc') doc: number,
  ) {
    console.log('doc:', doc, 'role', role);

    return this.permisssionsService.getPermissionByRoleDoc(doc, role);
  }

  @Get('eligiblityCheck/:role/:doc')
  eligiblityCheck(@Param('role') role: number, @Param('doc') doc: number) {
    console.log('doc:', doc, 'role', role);

    return this.permisssionsService.eligiblityCheck(doc, role);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermisssionDto: UpdatePermisssionDto,
  ) {
    return this.permisssionsService.update(+id, updatePermisssionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisssionsService.remove(+id);
  }
}
