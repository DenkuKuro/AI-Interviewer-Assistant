import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service.js';
import { ProblemsController } from './problems.controller.js';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
