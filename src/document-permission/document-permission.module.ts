import { Module } from '@nestjs/common';
import { DocumentPermissionService } from './document-permission.service';
import { DocumentPermissionController } from './document-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentPermission } from './entities/document-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentPermission])],
  controllers: [DocumentPermissionController],
  providers: [DocumentPermissionService],
})
export class DocumentPermissionModule {}
