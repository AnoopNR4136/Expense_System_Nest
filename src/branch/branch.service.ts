import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchService: Repository<Branch>,
  ) {}
  async create(createBranchDto: CreateBranchDto) {
    try {
      return await this.branchService.save({ ...createBranchDto });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.branchService.find();
    } catch (error) {}
  }

  async getBranchByEmployeeID(id: string) {
    try {
      let manager = getManager();
      return await manager.query(
        `
        SELECT tbl_branch.branch_id,branch_name FROM tbl_branch 
INNER JOIN tbl_emp_role_branch ON tbl_branch.branch_id = tbl_emp_role_branch.branch_id
WHERE employee_id ='${id}'
        `,
      );
    } catch (error) {}
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
