import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StateTypeService } from './state-type.service';
import { CreateStateTypeDto } from './dto/create-state-type.dto';
import { UpdateStateTypeDto } from './dto/update-state-type.dto';

@Controller('state-type')
export class StateTypeController {
  constructor(private readonly stateTypeService: StateTypeService) {}

  @Post()
  create(@Body() createStateTypeDto: CreateStateTypeDto) {
    return this.stateTypeService.create(createStateTypeDto);
  }

  @Get()
  findAll() {
    return this.stateTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStateTypeDto: UpdateStateTypeDto) {
    return this.stateTypeService.update(+id, updateStateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateTypeService.remove(+id);
  }
}
