import { PartialType } from '@nestjs/swagger';
import { CreateRequestDto } from './create-request.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
export class CompleteUpdateStatus {
  id: number;
  status: number;
  requestdetailsID: number;
}
