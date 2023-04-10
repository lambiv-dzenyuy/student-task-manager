import { Body, Controller, Get, HttpCode, Logger, Param, Patch, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { retry } from "rxjs";
import { StudentService} from "./student.service";
import { Public } from "../auth/skip.auth";
import { CreateStudentDto } from "./dto/create-student.dto";

@Controller("api/v1/user")
export class StudentController {
  constructor(private readonly studentService: StudentService, private jwtService: JwtService) {}

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

 

  @Get()
  students() {
    Logger.log('students');
    return this.studentService.findAll();
  }

  @Public()
  @Post()
  @HttpCode(204)
  create(@Body() studentDto : CreateStudentDto) {
   return this.studentService.create(studentDto);
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
