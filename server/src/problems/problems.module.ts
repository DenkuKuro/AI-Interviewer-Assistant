import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service.js';
import { ProblemsController } from './problems.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SupabaseService } from '../supabase/supabase.service.js';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService, PrismaService, SupabaseService],
})
export class ProblemsModule {}
