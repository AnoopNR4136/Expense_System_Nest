import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/configSettings';
import { BranchModule } from './branch/branch.module';
import { RoleModule } from './role/role.module';
import { EmployeesModule } from './employees/employees.module';
import { DocumentModule } from './document/document.module';
import { StateTypeModule } from './state-type/state-type.module';
import { PermisssionsModule } from './permisssions/permisssions.module';
import { DocumentPermissionModule } from './document-permission/document-permission.module';
import { DocumentRolePermissionModule } from './document-role-permission/document-role-permission.module';
import { RoleDocumentModule } from './role-document/role-document.module';
import { WorkflowModule } from './workflow/workflow.module';
import { RequestsModule } from './requests/requests.module';
import { QueryModuleModule } from './query-module/query-module.module';
import { RequestModule } from './request/request.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BranchModule, RoleModule, EmployeesModule, DocumentModule, StateTypeModule, PermisssionsModule, DocumentPermissionModule, DocumentRolePermissionModule, RoleDocumentModule, WorkflowModule, RequestsModule, QueryModuleModule, RequestModule, ActionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
