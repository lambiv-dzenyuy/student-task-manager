import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class StudentService {

  constructor( private readonly prisma : PrismaService, private jwtService: JwtService){}
    
  findOne(email: string) {
   return this.prisma.student.findUnique({where : {email}});
 }

 findOne1(id: string) {
   return this.prisma.task.findUnique({ where: { id: id } });
 }
 findAll() {
   return this.prisma.student.findMany();
 }
}

