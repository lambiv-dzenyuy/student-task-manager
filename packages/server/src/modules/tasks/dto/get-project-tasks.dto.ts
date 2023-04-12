import { ApiProperty } from '@nestjs/swagger';

export class GetProjectTasksDto {
  @ApiProperty()

  studentId: string;
  projectId: string;
}
