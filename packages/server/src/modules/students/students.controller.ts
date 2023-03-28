import { Controller, Get, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class StudentController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/api/users')
  async students() {
    Logger.log('students');
    return this.prisma.student.findMany();
  }
}
