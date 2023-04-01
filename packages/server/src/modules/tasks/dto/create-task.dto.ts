import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  title: string;
  description?: string;
  status: string;
  priority: string;
  studentId: number;
  projectId: string;
  endDate: Date;
}
