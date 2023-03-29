import { Controller, Get, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class TaskController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/api/tasks')
  async tasks() {
    Logger.log('students');
    return this.prisma.task.findMany();
  }
  @Get('/api/tasks/:id')
  async getTasks() {
    Logger.log('students');
    return this.prisma.task.findMany();
  }
}
