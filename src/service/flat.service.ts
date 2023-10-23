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
      .addRoomCount(2)
      .addRoomCount(3)
      .addRoomCount(4)
      .minAreaLiving(50)
      .sortByUpdated()
      .build();
  }

  async fetchNewFlats(lastId: number) {
    const newFlats: Flat[] = [];
    let page = 1;
    while (true) {
      const flats = await this.realtWebsiteParser.parse(this.realtFilters, page);
      const lastIdIndex = flats.findIndex((flat) => flat.code === lastId);
      page++;
      if (lastIdIndex > -1) {
        newFlats.push(...flats.slice(0, lastIdIndex));
        return newFlats.reverse();
      } else {
        newFlats.push(...flats);
      }
    }
  }
}
