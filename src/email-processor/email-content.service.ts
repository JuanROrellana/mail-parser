import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs/promises';
import { ParsedMail, simpleParser } from 'mailparser';

@Injectable()
export class EmailContentService {
  constructor(private readonly httpService: HttpService) {}

  async getEmailContent(source: string): Promise<ParsedMail> {
    try {
      if (source.startsWith('http://') || source.startsWith('https://')) {
        // Add
        const response = await firstValueFrom(
          this.httpService.get(source, { responseType: 'arraybuffer' }),
        );
        const fileContent = Buffer.from(response.data);
        return simpleParser(fileContent);
      } else {
        const fileContent = await fs.readFile(source);
        return simpleParser(fileContent);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve email from source: ${source} Error: ${error}`,
      );
    }
  }
}
