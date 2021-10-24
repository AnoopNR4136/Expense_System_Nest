import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentRolePermissionService } from './document-role-permission.service';
import { CreateDocumentRolePermissionDto } from './dto/create-document-role-permission.dto';
import { UpdateDocumentRolePermissionDto } from './dto/update-document-role-permission.dto';

@Controller('document-role-permission')
export class DocumentRolePermissionController {
  constructor(
    private readonly documentRolePermissionService: DocumentRolePermissionService,
  ) {}

  @Post('add_document-role-permission')
  create(
    @Body() createDocumentRolePermissionDto: CreateDocumentRolePermissionDto,
  ) {
    return this.documentRolePermissionService.create(
      createDocumentRolePermissionDto,
    );
  }

  @Get('getDocRolePermission')
  findAll() {
    return this.documentRolePermissionService.getDocRolePermission();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentRolePermissionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentRolePermissionDto: UpdateDocumentRolePermissionDto,
  ) {
    return this.documentRolePermissionService.update(
      +id,
      updateDocumentRolePermissionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentRolePermissionService.remove(+id);
  }
}
