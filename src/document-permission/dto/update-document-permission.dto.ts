import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentPermissionDto } from './create-document-permission.dto';

export class UpdateDocumentPermissionDto extends PartialType(CreateDocumentPermissionDto) {}
