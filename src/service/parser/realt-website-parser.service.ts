import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { Flat } from '../../models/flat';
import { TaskManager } from "../../core/task-manager";

@Injectable()
export class RealtWebsiteParser {
  taskManager = new TaskManager({ delay: 1000 });

  async parse(filters: string = '', page = 1): Promise<Flat[]> {
    const url = `https://realt.by/sale/flats/?${filters}&page=${page}`;
    console.log(`Try to fetch data from url: ${url}`);
    const pageHtml = await this.fetch(url);

    return this.parseFlats(pageHtml);
  }

  fetch(url: string): Promise<string> {
    return this.taskManager.exec(async () => {
      const response = await fetch(url);
      return response.text();
    }) as Promise<string>;
  }

  private parseFlats(page: string): Flat[] {
    const [, dataString] =
      /<script id="__NEXT_DATA__"[\w\W]+?>([\w\W]+)<\/script>/.exec(page) || [];
    const data = JSON.parse(dataString);
    return data.props.pageProps.initialState.objectsListing.objects as Flat[];
  }
}
