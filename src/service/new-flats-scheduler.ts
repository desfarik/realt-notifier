import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FlatService } from './flat.service';
import { TelegramNotifier } from './telegram-notifier';
import { LastSyncRepository } from "../repository/last-sync.repository";

@Injectable()
export class NewFlatsScheduler {
  constructor(
    private flatService: FlatService,
    private telegramNotifier: TelegramNotifier,
    private lastSyncRepository: LastSyncRepository,
  ) {
    this.checkNewFlats();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async checkNewFlats() {
    const lastSyncTime = this.lastSyncRepository.getLastSyncTime()
    const newFlats = await this.flatService.fetchNewFlats(lastSyncTime);
    newFlats.forEach((flat) => this.telegramNotifier.notifyNewFlat(flat));
    if(newFlats.length ===0) {
      console.log(`No new flats.`)
    }

    this.lastSyncRepository.setLastSyncTime(Date.now());
  }
}
