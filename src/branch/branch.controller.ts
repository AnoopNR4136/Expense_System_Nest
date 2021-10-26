import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post('new_branch')
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get('get_all_branch')
  findAll() {
    return this.branchService.findAll();
  }

  @Get('get_branch_by_employee_iD/:id')
  getBranchByEmployeeID(@Param('id') id: string) {
    return this.branchService.getBranchByEmployeeID(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
