import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentRolePermissionDto } from './create-document-role-permission.dto';

export class UpdateDocumentRolePermissionDto extends PartialType(CreateDocumentRolePermissionDto) {}
