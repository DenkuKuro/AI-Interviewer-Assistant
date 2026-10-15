import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SupabaseService } from '../supabase/supabase.service.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, SupabaseService],
})
export class UsersModule {}
