import { Injectable } from '@nestjs/common';
import { RealtWebsiteParser } from './parser/realt-website-parser.service';
import { Flat } from '../models/flat';
import { RealtFilters } from './parser/realt-filters';

@Injectable()
export class FlatService {
  constructor(private realtWebsiteParser: RealtWebsiteParser) {}

  get realtFilters(): string {
    return new RealtFilters()
      .filterByMinskDistricts()
      .notFirstFloor()
      .maxPrice(180_000)
      .priceUsd()
      .addRoomCount(2)
      .addRoomCount(3)
      .addRoomCount(4)
      .minTotalArea(50)
      .sortByCreated()
      .build();
  }

  async fetchNewFlats(lastSyncTime: number) {
    const newFlats: Flat[] = [];
    let page = 1;
    while (true) {
      const flats = await this.realtWebsiteParser.parse(
        this.realtFilters,
        page,
      );
      const lastIdIndex = flats.findIndex(
        (flat) => lastSyncTime > new Date(flat.updatedAt).getTime(),
      );
      page++;
      if (lastIdIndex > -1) {
        newFlats.push(...flats.slice(0, lastIdIndex));
        return newFlats
          .reverse()
          .filter((flat) => lastSyncTime < new Date(flat.createdAt).getTime())
          .filter((flat) => !flat.address.includes('Нововиленская'))
          .filter((flat) => !/маяк минска/gi.test(flat.description))
          .filter((flat) => !/парк челюскинцев/gi.test(flat.description));
      } else {
        newFlats.push(...flats);
      }
    }
  }
}
