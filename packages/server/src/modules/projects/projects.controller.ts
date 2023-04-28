import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectTasksDto } from '../tasks/dto/get-project-tasks.dto';

@Controller('api/v1/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':studentId/all')
  async findAllStudentProjects(@Param('studentId') studentId: string) {
    Logger.log(`student id gotten is of type, ${studentId}`);
    return this.projectsService.findStudentProjects(+studentId);
  }

  
  @Get(':studentId/:projectId')
  async findAllStudentProjectTask(@Param('studentId') getProjectTasksDto: GetProjectTasksDto) {
    Logger.log(`student id gotten is of type, ${getProjectTasksDto.studentId}`);
    return this.projectsService.findStudentProjectTasks(+getProjectTasksDto.studentId, getProjectTasksDto.projectId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
