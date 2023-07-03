import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StudentService } from '../users/student.service';


@Injectable()
export class AuthService {
  constructor(private studentsService: StudentService,  private jwtService: JwtService) {}

  async signIn(email: string, pass: string) {
    const user =  await this.studentsService.findOne(email);
    const saltRounds = process.env.PASSWORD_SALT_ROUNDS;
      const cryptedPassword = await bcrypt.hash(
        pass,
        Number(saltRounds)
      );

    if (user?.password !== cryptedPassword) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
  
    const payload = { email: user.email, sub: user.id };
    return {
      userData: result,
      access_token: await this.jwtService.signAsync(payload),
    };

  }
}