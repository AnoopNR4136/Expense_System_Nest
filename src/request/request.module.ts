import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestDetails, RequestDetailsActions, Requests } from './entities/request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestDetails, Requests, RequestDetailsActions]),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
