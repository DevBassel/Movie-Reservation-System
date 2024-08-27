import { Injectable } from '@nestjs/common';
import { ReservatService } from '../reservat/reservat.service';
import schedule from 'node-schedule';
import { EmailsService } from '../emails/emails.service';
import { NotifyReservatTemp } from '../emails/templates/notify-reservat.templete';

@Injectable()
export class SchedulingService {
  constructor(
    private readonly reservatService: ReservatService,
    private readonly emailsService: EmailsService,
  ) {}
  async commingMovie() {
    console.log('comming reservats scheduling start ..');
    schedule.scheduleJob('00 * * * *', async () => {
      const currentDate = this.getUtcDate(new Date());
      const showtime = this.getUtcDate(new Date());
      showtime.setHours(showtime.getHours() + 1);

      const reservats = await this.reservatService.findAllOfUssers(
        showtime,
        currentDate,
      );

      console.log(reservats);
      reservats.forEach((reservat) => {
        this.emailsService.sendEmail({
          to: reservat.user.email,
          subject: 'remimber a movie show time',
          html: NotifyReservatTemp(reservat),
        });
        console.log(`email send to ${reservat.user.name}`);
      });
    });
  }

  private getUtcDate(date: Date) {
    // Get the time zone offset for Cairo in minutes
    const cairoTimeZoneOffset = new Date(date).toLocaleString('en-US', {
      timeZone: 'Africa/Cairo',
      hour12: false,
    });

    const [cairoDate, cairoTime] = cairoTimeZoneOffset.split(', ');
    const [month, day, year] = cairoDate.split('/');
    const [hour, minute, second] = cairoTime.split(':');

    const cairoDateObject = new Date(
      Date.UTC(+year, +month - 1, +day, +hour, +minute, +second),
    );
    const cairoISOString = cairoDateObject.toISOString();
    return new Date(cairoISOString);
  }
}
