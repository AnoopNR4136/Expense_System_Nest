import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
