import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FlatService } from './flat.service';
import { TelegramNotifier } from './telegram-notifier';

@Injectable()
export class NewFlatsScheduler {
  constructor(
    private flatService: FlatService,
    private telegramNotifier: TelegramNotifier,
  ) {
    this.checkNewFlats();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async checkNewFlats() {
    // get last id  from db
    const lastId = 3143238;
    const newFlats = await this.flatService.fetchNewFlats(lastId);
    console.log(newFlats.length);
    newFlats.forEach((flat) => this.telegramNotifier.notifyNewFlat(flat));
  }
}
