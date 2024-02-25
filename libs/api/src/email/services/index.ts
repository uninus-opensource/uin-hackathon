import { Injectable } from '@nestjs/common';
import {
  EPaginationOrderBy,
  TActivityRequest,
  TActivityResponse,
  TActivitySingleResponse,
  TPaginationRequest,
} from '@psu/entities';
import { MailerService } from "@nestjs-modules/mailer";
@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(email: string, subject: string, html: string) {
    const send = await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
    if (!send) {
      throw new BadRequestException("Email tidak terkirim");
    }
  }
}
