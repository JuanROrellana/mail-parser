import { Injectable, NotFoundException } from '@nestjs/common';
import { ParsedMail } from 'mailparser';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EmailJsonExtractorService {
  constructor(private readonly httpService: HttpService) {}

  parseJsonFromEmailBody(emailContent: ParsedMail) {
    const fromJsonAttachment = this.extractFromJsonAttachment(emailContent);
    if (fromJsonAttachment) {
      return fromJsonAttachment;
    }

    //TODO: Implement Extract Json from URL in Email Body
    //TODO: Implement Extract Json from Email web link page

    throw new NotFoundException(
      'Could not find JSON data in the email using any method.',
    );
  }

  extractFromJsonAttachment(emailContent: ParsedMail): unknown {
    if (emailContent.attachments && emailContent.attachments.length > 0) {
      for (const attachment of emailContent.attachments) {
        if (
          attachment.contentType === 'application/json' ||
          (attachment.filename &&
            attachment.filename.toLowerCase().endsWith('.json'))
        ) {
          const jsonString = attachment.content.toString('utf-8');
          return JSON.parse(jsonString);
        }
      }
    }

    return null;
  }
}
