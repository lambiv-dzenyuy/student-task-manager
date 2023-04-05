import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../users/student.service';


@Injectable()
export class AuthService {
  constructor(private studentsService: StudentService,  private jwtService: JwtService) {}

  async signIn(email: string, pass: string) {
    const user =  await this.studentsService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
  
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  
    return result;
  }
}