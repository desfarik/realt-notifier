import { Injectable } from '@nestjs/common';
import { Flat } from '../models/flat';
import { formatPrice } from "../formatters/price.formatter";

@Injectable()
export class TelegramMessageBuilder {
  buildFlatMessage(flat: Flat): string {
    return `*Цена:*  ${formatPrice(flat.price)} (${formatPrice(flat.pricePerM2)}/м2)
*Площадь:*  ${flat.areaTotal}м2 (${flat.areaLiving}м2 жилая)
*Комнат:*  ${flat.rooms}
*Этаж:*  ${flat.storey} / ${flat.storeys}
*Адрес:*  ${flat.address}
*Год постройки:*  ${flat.buildingYear}
https://realt.by/sale-flats/object/${flat.code}/`
  }
}
