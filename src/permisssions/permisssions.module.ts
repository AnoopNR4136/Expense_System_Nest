import { Module } from '@nestjs/common';
import { PermisssionsService } from './permisssions.service';
import { PermisssionsController } from './permisssions.controller';
import { typeOrmConfig } from 'src/config/configSettings';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permisssions } from './entities/permisssion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permisssions])],
  controllers: [PermisssionsController],
  providers: [PermisssionsService],
})
export class PermisssionsModule {}
