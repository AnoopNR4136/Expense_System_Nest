import { Injectable } from '@nestjs/common';
import { CreateStateTypeDto } from './dto/create-state-type.dto';
import { UpdateStateTypeDto } from './dto/update-state-type.dto';

@Injectable()
export class StateTypeService {
  create(createStateTypeDto: CreateStateTypeDto) {
    return 'This action adds a new stateType';
  }

  findAll() {
    return `This action returns all stateType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stateType`;
  }

  update(id: number, updateStateTypeDto: UpdateStateTypeDto) {
    return `This action updates a #${id} stateType`;
  }

  remove(id: number) {
    return `This action removes a #${id} stateType`;
  }
}
