import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { Flat } from "../models/flat";
import { TelegramMessageBuilder } from "./telegram-message.builder";

const TELEGRAM_GROUP_URL =
  'https://api.telegram.org/bot6427835745%3AAAF3DncpWJyoIlrECxJsPE890Bs1BNLJ_Ds/sendMessage';
const HEADERS = {
  accept: 'application/json',
  'User-Agent':
  'Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)',
  'content-type': 'application/json',
};

@Injectable()
export class TelegramNotifier {

  constructor(private messageBuilder: TelegramMessageBuilder) {
  }
  async notifyNewFlat(flat: Flat): Promise<void> {
    if(true) {
      console.log(this.messageBuilder.buildFlatMessage(flat))
      return Promise.resolve();
    }
    await fetch(TELEGRAM_GROUP_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        text: this.messageBuilder.buildFlatMessage(flat),
        parse_mode: 'Markdown',
        disable_web_page_preview: false,
        disable_notification: true,
        reply_to_message_id: null,
        chat_id: '-4059693421',
      }),
    });
  }
}
