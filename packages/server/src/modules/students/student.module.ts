import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StudentController } from './students.controller';

@Module({
  imports: [PrismaModule],
  providers: [StudentController],
})
export class StudentModule {}
