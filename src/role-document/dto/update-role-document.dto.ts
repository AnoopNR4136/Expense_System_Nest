import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDocumentDto } from './create-role-document.dto';

export class UpdateRoleDocumentDto extends PartialType(CreateRoleDocumentDto) {}
