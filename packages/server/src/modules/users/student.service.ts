import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(email: string) {
    return this.prisma.student.findUnique({ where: { email } });
  }

  findOne1(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }
  async create(createStudentDto: CreateStudentDto) {
    try {
      const saltRounds = process.env.PASSWORD_SALT_ROUNDS;
      const cryptedPassword = await bcrypt.hash(
        createStudentDto.password,
        Number(saltRounds)
      );
      this.prisma.student.create({
        data:{
          ... createStudentDto,
          password: cryptedPassword
        }
      });
    } catch (err) {
      throw new HttpException(
        `Student with id: ${createStudentDto.email} already exist.`,
        HttpStatus.FORBIDDEN
      );
    }
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data: updateStudentDto
    });
  }
}
