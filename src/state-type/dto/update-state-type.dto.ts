import { PartialType } from '@nestjs/mapped-types';
import { CreateStateTypeDto } from './create-state-type.dto';

export class UpdateStateTypeDto extends PartialType(CreateStateTypeDto) {}
