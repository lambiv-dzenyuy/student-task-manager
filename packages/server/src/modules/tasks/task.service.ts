import { Injectable } from "@nestjs/common";
import { zip } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {};

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data : createTaskDto,
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({ where: { id: id } });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({ data : updateTaskDto, where: {  id } });
  }

  findStudentProjectTasks( studentId :  number, projectId : string) {
    return this.prisma.task.findMany({ where: { studentId, projectId } });
  }

  remove(id: string) {
    return this.prisma.task.delete({ where : { id : id }});
  }
}

