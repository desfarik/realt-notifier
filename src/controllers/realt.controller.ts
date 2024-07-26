import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Flat } from '../models/flat';
import { RealtWebsiteParser } from '../service/parser/realt-website-parser.service';
import { RealtFilters } from '../service/parser/realt-filters';
import { TelegramNotifier } from '../service/telegram-notifier';
import { formatPrice } from '../formatters/price.formatter';
import { LastSyncRepository } from '../repository/last-sync.repository';
import { NewFlatsScheduler } from '../service/new-flats-scheduler';

@Controller()
export class RealtController {
  constructor(
    private readonly realtWebsiteParser: RealtWebsiteParser,
    private readonly telegramNotifier: TelegramNotifier,
    private readonly lastSyncRepository: LastSyncRepository,
    private readonly newFlatsScheduler: NewFlatsScheduler,
  ) {}

  @Post('realt/parse/:page')
  async parseRealt(@Param('page') page: number = 1): Promise<Flat[]> {
    const filters = new RealtFilters()
      .filterByMinskDistricts()
      .notFirstFloor()
      .addRoomCount(2)
      .addRoomCount(3)
      .addRoomCount(4)
      .minTotalArea(50)
      .sortByCreated()
      .build();

    return this.realtWebsiteParser.parse(filters, page);
  }

  @Post('realt/parsing/start')
  startParseRealt(): Promise<void> {
    return this.newFlatsScheduler.checkNewFlats();
  }

  @Post('realt/telegram/notify/:number')
  async sendMessageToTelegram(
    @Param('number') number: number = 1,
  ): Promise<void> {
    const flats = await this.parseRealt(1);
    return this.telegramNotifier.notifyNewFlat(flats[number]);
  }

  @Get('realt/format/:number')
  format(@Param('number') number: number): string {
    return formatPrice(number);
  }

  @Post('realt/last-updated-date/:date')
  setLastUpdatedDate(@Param('date') number: number): void {
    this.lastSyncRepository.setLastSyncTime(Number(number));
  }
}
