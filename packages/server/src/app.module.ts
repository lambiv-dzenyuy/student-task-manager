import { Module } from '@nestjs/common';
import { TaskModule } from './modules/tasks/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/users/student.module';

@Module({
  imports: [
    PrismaModule,
    StudentModule,
    TaskModule,
    ProjectsModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
