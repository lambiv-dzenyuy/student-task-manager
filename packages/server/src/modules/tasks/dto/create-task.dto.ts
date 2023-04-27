import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  studentId: number;
  projectId: string;
  endDate: Date;
  startDate?:  Date;
}
