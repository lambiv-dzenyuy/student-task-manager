import { ApiProperty } from '@nestjs/swagger';

export class GetProjectTasksDto {
  @ApiProperty()

  studentId: number;
  projectId: string;
}
