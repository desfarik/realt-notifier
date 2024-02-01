import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { Flat } from "../../models/flat";
import { rateLimit } from "utils-decorators";

@Injectable()
export class RealtWebsiteParser {

  @rateLimit({
    timeSpanMs: 1000,
    allowedCalls: 1,
  })
  async parse(filters: string = '', page = 1): Promise<Flat[]> {
    const url = `https://realt.by/sale/flats/?${filters}&page=${page}`;
    console.log(`Try to fetch data from url: ${url}`)
    const response = await fetch(url);
    const pageHtml = await response.text();

    return this.parseFlats(pageHtml);
  }

  private parseFlats(page: string): Flat[] {
    const [, dataString] = /<script id="__NEXT_DATA__"[\w\W]+?>([\w\W]+)<\/script>/.exec(page) || [];
    const data = JSON.parse(dataString);
    return data.props.pageProps.initialState.objectsListing.objects as Flat[];
  }
}
