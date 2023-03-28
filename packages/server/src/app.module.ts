import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/students/student.module';
import { StudentController } from './modules/students/students.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, StudentModule],
  controllers: [AppController, StudentController],
  providers: [AppService],
})
export class AppModule {}
