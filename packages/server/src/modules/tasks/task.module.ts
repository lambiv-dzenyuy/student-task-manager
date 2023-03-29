import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskController } from './task.controller';

@Module({
  imports: [PrismaModule],
  providers: [TaskController],
})
export class TaskModule {}
