import { Body, Controller, Get, HttpCode, Logger, Param, Patch, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { retry } from "rxjs";
import { StudentService} from "./student.service";

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

  @Post()
  @HttpCode(204)
  create() {
    return 'This action adds a new cat';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
