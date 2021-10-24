import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleDocumentService } from './role-document.service';
import { CreateRoleDocumentDto } from './dto/create-role-document.dto';
import { UpdateRoleDocumentDto } from './dto/update-role-document.dto';

@Controller('role-document')
export class RoleDocumentController {
  constructor(private readonly roleDocumentService: RoleDocumentService) {}

  @Post('add-role-document')
  create(@Body() createRoleDocumentDto: CreateRoleDocumentDto) {
    return this.roleDocumentService.create(createRoleDocumentDto);
  }

  @Get('get_role_doc')
  getRoleDoc() {
    return this.roleDocumentService.getRoleDoc();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDocumentDto: UpdateRoleDocumentDto,
  ) {
    return this.roleDocumentService.update(+id, updateRoleDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleDocumentService.remove(+id);
  }
}
