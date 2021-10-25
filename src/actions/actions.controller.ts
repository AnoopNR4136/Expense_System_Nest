import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { getManager } from 'typeorm';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post('new_action')
  create(@Body() createActionDto: CreateActionDto) {
    try {
      let manager = getManager();
      manager.query(
        `INSERT INTO tbl_actions (action_name) values('${createActionDto.action_name}')`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Get('get_all_action')
  findAll() {
    try {
      let manager = getManager();
      return manager.query(`SELECT * FROM tbl_actions `);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionDto: UpdateActionDto) {
    return this.actionsService.update(+id, updateActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionsService.remove(+id);
  }
}
