import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        startDate: new Date(createTaskDto.startDate),
        endDate: new Date(createTaskDto.endDate)
      }
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }
  
  delete(taskId: string){
    return this.prisma.task.delete({
      where : {id : taskId}
    })
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({ where: { id: id } });
  }
  
  update(updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      data: updateTaskDto,
      where: { id: updateTaskDto.id }
    });
  }
  findStudentTasks(id: number) {
    return this.prisma.task.findMany({ where: { studentId: id } });
  }

  findStudentProjectTasks(studentId: number, projectId: string) {
    return this.prisma.task.findMany({ where: { studentId, projectId } });
  }

  remove(id: string) {
    return this.prisma.task.delete({ where: { id: id } });
  }
}
