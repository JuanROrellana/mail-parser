import { Injectable } from '@nestjs/common';
import { EmailContentService } from './email-content.service';
import { EmailJsonExtractorService } from './email-extractor.service';

@Injectable()
export class EmailProcessorService {
  constructor(
    private readonly emailContentService: EmailContentService,
    private readonly emailJsonExtractorService: EmailJsonExtractorService,
  ) {}

  async parseJson(source: string) {
    const emailContent = await this.emailContentService.getEmailContent(source);
    return this.emailJsonExtractorService.parseJsonFromEmailBody(emailContent);
  }

  parseCsv(source: string) {
    return `This ${source} is a CSV file`;
  }
}
