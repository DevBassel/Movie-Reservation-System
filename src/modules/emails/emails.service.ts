import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { sendEmail } from './interfaces/send-email.interface';

@Injectable()
export class EmailsService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_SK,
    },
  });

  sendEmail(data: sendEmail) {
    this.transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        ...data,
      },
      (err, info) => {
        if (err) console.log(err);

        console.log(info);
      },
    );
  }
}
