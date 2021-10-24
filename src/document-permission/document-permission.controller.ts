import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentPermissionService } from './document-permission.service';
import { CreateDocumentPermissionDto } from './dto/create-document-permission.dto';
import { UpdateDocumentPermissionDto } from './dto/update-document-permission.dto';

@Controller('document-permission')
export class DocumentPermissionController {
  constructor(
    private readonly documentPermissionService: DocumentPermissionService,
  ) {}

  @Post('create-document-permission')
  create(@Body() createDocumentPermissionDto: CreateDocumentPermissionDto) {
    console.log(createDocumentPermissionDto);

    return this.documentPermissionService.create(createDocumentPermissionDto);
  }

  @Get()
  findAll() {
    return this.documentPermissionService.findAll();
  }

  @Get('get_permission_by_document/:id')
  getPermissionByDocumentId(@Param('id') id: string) {
    return this.documentPermissionService.getPermissionByDocumentId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentPermissionDto: UpdateDocumentPermissionDto,
  ) {
    return this.documentPermissionService.update(
      +id,
      updateDocumentPermissionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentPermissionService.remove(+id);
  }
}
