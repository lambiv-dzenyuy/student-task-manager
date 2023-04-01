import { Module } from '@nestjs/common';
import { StudentModule } from './modules/students/student.module';
import { StudentController } from './modules/students/students.controller';
import { TaskController } from './modules/tasks/task.controller';
import { TaskModule } from './modules/tasks/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [PrismaModule, StudentModule, TaskModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
