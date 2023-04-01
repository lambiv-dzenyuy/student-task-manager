import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { retry } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetProjectTasksDto } from "./dto/get-project-tasks.dto";
import { TasksService } from "./task.service";

@Controller("api/v1/tasks")
export class TaskController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService. findOne(id);
  }

  @Get(':studentId/:projectId')
  findStudentTasksByProjectId(@Param() params : GetProjectTasksDto){
    return this.tasksService.findStudentProjectTasks(params.studentId, params.projectId)
  }

}
