import { Injectable } from "@nestjs/common";
import { zip } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {

  constructor(private prisma: PrismaService) {};

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id: id } });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({ data : updateProjectDto, where: {  id } });
  }

  findStudentProjects( studentId :  number) {
    return this.prisma.project.findMany({ where: { studentId : studentId} });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where : { id : id }});
  }
}

