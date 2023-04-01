import { Controller, Get, HttpCode, Logger, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/v1//students')
export class StudentController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  students() {
    Logger.log('students');
    return this.prisma.student.findMany();
  }

  @Post()
  @HttpCode(204)
  create() {
    return 'This action adds a new cat';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
