import { Injectable, NotFoundException } from '@nestjs/common';
import { ParsedMail } from 'mailparser';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EmailJsonExtractorService {
  constructor(private readonly httpService: HttpService) {}

  async parseJsonFromEmailBody(emailContent: ParsedMail): Promise<unknown> {
    const fromJsonAttachment = this.extractFromJsonAttachment(emailContent);
    if (fromJsonAttachment) {
      return fromJsonAttachment;
    }

    const linksArray = this.extractUrlsFromEmailBody(emailContent);

    if (linksArray.length === 0) {
      throw new NotFoundException('Could not find JSON data in the email.');
    }

    return await this.getJsonFromUrls(linksArray);
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

  //TODO: This would have been better to be in a separate service (UrlsHelperService)
  extractUrlsFromEmailBody(parsedEmail: ParsedMail): string[] {
    const bodyHtml = parsedEmail.html || parsedEmail.textAsHtml;
    const bodyText = parsedEmail.text;

    if (bodyHtml) {
      return this.getUrlsFromHtml(bodyHtml);
    } else if (bodyText) {
      const urlRegex = /(https?:\/\/[^\s"'<>]+)/gi;
      return bodyText.match(urlRegex) || [];
    }

    return [];
  }

  //TODO: As well as this (UrlsHelperService)
  getUrlsFromHtml(html: string): string[] {
    const potentialUrls: string[] = [];
    const $ = cheerio.load(html);
    $('a').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        potentialUrls.push(href);
      }
    });
    return potentialUrls;
  }

  //TODO: This would have been better to be in a separate service (HttpHelperService)
  async getWebPageDataFromUrl(url: string) {
    try {
      return await firstValueFrom(this.httpService.get(url));
    } catch (error) {
      console.error(
        `Failed to fetch or parse JSON from ${url}:`,
        (error as Error).message,
      );
      return null;
    }
  }

  // Use of recursion to get the JSON from the URLs
  // Possible better to use Promise.allSettled
  async getJsonFromUrls(urls: string[]) {
    for (const url of urls) {
      const response = await this.getWebPageDataFromUrl(url);
      if (!response) {
        continue;
      }
      if (
        typeof response.headers['content-type'] === 'string' &&
        response.headers['content-type'].includes('application/json')
      ) {
        return response.data as unknown;
      } else if (
        typeof response.headers['content-type'] === 'string' &&
        response.headers['content-type'].includes('text/html') &&
        response.data
      ) {
        const links = this.getUrlsFromHtml(response.data as string);
        return (await this.getJsonFromUrls(links)) as unknown;
      } else {
        return;
      }
    }
    return;
  }
}
