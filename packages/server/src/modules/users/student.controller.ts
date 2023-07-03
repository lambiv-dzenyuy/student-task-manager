import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { retry } from 'rxjs';
import { StudentService } from './student.service';
import { Public } from '../auth/skip.auth';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('api/v1/user')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private jwtService: JwtService
  ) {}

  @Public()
  @Post()
  @HttpCode(204)
  create(@Body() studentDto: CreateStudentDto) {
    return this.studentService.create(studentDto);
  }
  @Patch(':id')
  @HttpCode(204)
  update(@Body() studentDto: UpdateStudentDto, @Param('id') studentId: string) {
    return this.studentService.update(+studentId, studentDto);
  }

}
