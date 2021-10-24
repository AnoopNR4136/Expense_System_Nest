import { Module } from '@nestjs/common';
import { DocumentRolePermissionService } from './document-role-permission.service';
import { DocumentRolePermissionController } from './document-role-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRolePermission } from './entities/document-role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentRolePermission])],
  controllers: [DocumentRolePermissionController],
  providers: [DocumentRolePermissionService],
})
export class DocumentRolePermissionModule {}
