import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Flat } from '../models/flat';
import { RealtWebsiteParser } from '../service/parser/realt-website-parser.service';
import { RealtFilters } from '../service/parser/realt-filters';
import { TelegramNotifier } from '../service/telegram-notifier';
import { formatPrice } from '../formatters/price.formatter';

@Controller()
export class RealtController {
  constructor(
    private readonly realtWebsiteParser: RealtWebsiteParser,
    private readonly telegramNotifier: TelegramNotifier,
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
      .sortByUpdated()
      .build();

    return this.realtWebsiteParser.parse(filters, page);
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
}
