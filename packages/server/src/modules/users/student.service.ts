import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { AuthService } from "../auth/auth.service";



@Injectable()
export class StudentService {

  constructor( private readonly prisma : PrismaService){}
    
  findOne(email: string) {
   return this.prisma.student.findUnique({where : {email}});
 }

 findOne1(id: string) {
   return this.prisma.task.findUnique({ where: { id: id } });
 }
 create(createStudentDto : CreateStudentDto ){
  const checkedStudent =this.findOne(createStudentDto.email)
  if(checkedStudent) !== && typeof(checkedStudent.) !== Student))
  throw new HttpException(`Student with id: ${createStudentDto.email} already exist.`, HttpStatus.FORBIDDEN);

 else 
 return this.prisma.student.create({
  data : createStudentDto
})
   
  
}
 findAll() {
   return this.prisma.student.findMany();
 }
}

