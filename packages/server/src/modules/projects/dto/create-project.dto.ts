import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  title: string;
  description: string;
  endDate: Date;
}
