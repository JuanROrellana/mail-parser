import { Controller, Post, Body } from '@nestjs/common';
import { EmailProcessorService } from './email-processor.service';
import { ProcessResourceDto } from './dto/process-source.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('email-processor')
@Controller('email-processor')
export class EmailProcessorController {
  constructor(private readonly emailProcessorService: EmailProcessorService) {}

  @ApiOperation({ summary: 'Parse JSON from email' })
  @ApiResponse({
    status: 200,
    description: 'The JSON content extracted from the email'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid source format'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while processing the email'
  })
  @Post('json')
  parseJson(@Body() body: ProcessResourceDto) {
    return this.emailProcessorService.parseJson(body.source);
  }

  @ApiOperation({ summary: 'Parse CSV from email' })
  @ApiResponse({
    status: 200,
    description: 'The CSV content extracted from the email'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid source format'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while processing the email'
  })
  @Post('csv')
  parseCsv(@Body() body: ProcessResourceDto) {
    return this.emailProcessorService.parseCsv(body.source);
  }
}
