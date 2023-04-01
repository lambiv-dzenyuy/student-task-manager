import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TaskController } from "./task.controller";
import { TasksService } from "./task.service";

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TasksService],

})
export class TaskModule {}
