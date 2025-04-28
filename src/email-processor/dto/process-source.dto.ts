import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessResourceDto {
  @ApiProperty({
    description: 'The source URL or file path of the email to be processed',
    example:
      'https://test-parser-juanramirez.s3.us-east-1.amazonaws.com/email-with-attachment.eml',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  source: string;
}
