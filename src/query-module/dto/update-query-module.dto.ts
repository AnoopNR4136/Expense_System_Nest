import { PartialType } from '@nestjs/swagger';
import { CreateQueryModuleDto } from './create-query-module.dto';

export class UpdateQueryModuleDto extends PartialType(CreateQueryModuleDto) {}
