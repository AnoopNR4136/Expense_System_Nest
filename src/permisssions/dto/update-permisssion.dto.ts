import { PartialType } from '@nestjs/mapped-types';
import { CreatePermisssionDto } from './create-permisssion.dto';

export class UpdatePermisssionDto extends PartialType(CreatePermisssionDto) {}
