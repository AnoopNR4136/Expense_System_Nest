import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('addEmployee')
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.getAllEmployees();
  }

  @Get('get_employee_by_branch_and_role/:branch_id/:role_id')
  getEmployeeByBranchAndRole(
    @Param('branch_id') branch_id: string,
    @Param('role_id') role_id: string,
  ) {
    return this.employeesService.getEmployeeByBranchAndRole(
      +branch_id,
      +role_id,
    );
  }

  @Get('employee_documents_by_employee_id_for_post_work_flow/:id')
  getEmpDocCeateWorkFlow(@Param('id') id: string) {
    return this.employeesService.getEmpDocCeateWorkFlow(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
