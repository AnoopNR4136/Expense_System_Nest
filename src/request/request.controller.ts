import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, RequestDetailsDTO } from './dto/create-request.dto';
import {
  CompleteUpdateStatus,
  UpdateRequestDto,
} from './dto/update-request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('post_request')
  postRequest(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.postRequest(createRequestDto);
  }
  @Post('post_request_details')
  postRequestDetails(@Body() createRequestDetailsDto: RequestDetailsDTO) {
    return this.requestService.postRequestDetails(createRequestDetailsDto);
  }

  @Get('get_all_pending_request/:id')
  ViewAllPendigRequest(@Param('id') id: string) {
    return this.requestService.ViewAllPendigRequest(id);
  }

  @Get('get_all_on_work_request/:id')
  ViewAllOnWorkRequest(@Param('id') id: string) {
    return this.requestService.ViewAllOnWorkRequest(id);
  }

  @Get('get_next_emp_of_work_flow/:permissionid/:employee_id/:workflowID')
  getNextEmpOfWorkFlow(
    @Param('permissionid') permissionid: number,
    @Param('employee_id') employee_id: string,
    @Param('workflowID') workflowID: number,
  ) {
    return this.requestService.getNextEmpOfWorkFlow(
      permissionid,
      employee_id,
      workflowID,
    );
  }

  @Post('CompleteUpdate')
  CompleteUpdate(@Body() updateStatus: CompleteUpdateStatus) {
    console.log('CompleteUpdate');

    return this.requestService.CompleteUpdate(updateStatus);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
