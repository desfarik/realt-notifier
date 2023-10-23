import { Module } from '@nestjs/common';
import { RealtController } from './controllers/realt.controller';
import { RealtWebsiteParser } from './service/parser/realt-website-parser.service';
import { TelegramNotifier } from './service/telegram-notifier';
import { TelegramMessageBuilder } from './service/telegram-message.builder';
import { ScheduleModule } from '@nestjs/schedule';
import { NewFlatsScheduler } from "./service/new-flats-scheduler";
import { FlatService } from "./service/flat.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers: [RealtController],
  providers: [
    RealtWebsiteParser,
    TelegramNotifier,
    TelegramMessageBuilder,
    NewFlatsScheduler,
    FlatService,

  ],
})
export class AppModule {}
