export class CreateProjectDto {
  @ApiProperty()
  title: string;
  description: string;
  endDate: Date;
}
