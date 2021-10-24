import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueryModuleService } from './query-module.service';
import { CreateQueryModuleDto } from './dto/create-query-module.dto';
import { UpdateQueryModuleDto } from './dto/update-query-module.dto';

@Controller('query-module')
export class QueryModuleController {
  constructor(private readonly queryModuleService: QueryModuleService) {}

  @Post()
  create(@Body() createQueryModuleDto: CreateQueryModuleDto) {
    return this.queryModuleService.create(createQueryModuleDto);
  }

  @Get('get_employee_for_work_flow/:docID/:empID')
  getEmployeeForWorkFlow(
    @Param('docID') docID: number,
    @Param('empID') empID: string,
  ) {
    return this.queryModuleService.getEmployeeForWorkFlow(docID, empID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryModuleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueryModuleDto: UpdateQueryModuleDto,
  ) {
    return this.queryModuleService.update(+id, updateQueryModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queryModuleService.remove(+id);
  }
}
