import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  firstName: string;
  email: string;
  lastName: string;
  password: string;
  avatar: string
}
