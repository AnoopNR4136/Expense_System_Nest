import { Module } from '@nestjs/common';
import { RoleDocumentService } from './role-document.service';
import { RoleDocumentController } from './role-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleDocument } from './entities/role-document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleDocument])],
  controllers: [RoleDocumentController],
  providers: [RoleDocumentService],
})
export class RoleDocumentModule {}
