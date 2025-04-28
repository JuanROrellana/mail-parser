import { Module } from '@nestjs/common';
import { EmailProcessorService } from './email-processor.service';
import { EmailProcessorController } from './email-processor.controller';
import { HttpModule } from '@nestjs/axios';
import { EmailContentService } from './email-content.service';
import { EmailJsonExtractorService } from './email-extractor.service';

@Module({
  imports: [HttpModule],
  controllers: [EmailProcessorController],
  providers: [
    EmailProcessorService,
    EmailContentService,
    EmailJsonExtractorService,
  ],
})
export class EmailProcessorModule {}
