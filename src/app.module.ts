import { Module } from '@nestjs/common';
import { RealtController } from './controllers/realt.controller';
import { RealtWebsiteParser } from './service/parser/realt-website-parser.service';
import { TelegramNotifier } from './service/telegram-notifier';
import { TelegramMessageBuilder } from './service/telegram-message.builder';
import { ScheduleModule } from '@nestjs/schedule';
import { NewFlatsScheduler } from "./service/new-flats-scheduler";
import { FlatService } from "./service/flat.service";
import { LastSyncRepository } from "./repository/last-sync.repository";
import { JSON_DB_TOKEN } from "./db/json.db";
const JSONdb = require("simple-json-db");

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
    {
      provide: JSON_DB_TOKEN,
      useValue: new JSONdb('./db/json.db.json')
    },
    LastSyncRepository,

  ],
})
export class AppModule {}
