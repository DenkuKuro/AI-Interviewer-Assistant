import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ProblemsModule } from './problems/problems.module.js';
import { InterviewsModule } from './interviews/interviews.module.js';
import { MessagesModule } from './messages/messages.module.js';
import { SubmissionsModule } from './submissions/submissions.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SupabaseModule } from './supabase/supabase.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, 
    ProblemsModule, 
    InterviewsModule, 
    MessagesModule, 
    SubmissionsModule,
    PrismaModule,
    SupabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
