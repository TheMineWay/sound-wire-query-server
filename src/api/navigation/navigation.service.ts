import { Inject, Injectable } from '@nestjs/common';
import { PuppeteerService } from '../../providers/puppeteer/puppeteer.service';
import { PUPPETEER_PROVIDER_KEY } from '../../providers/puppeteer/puppeteer.module';
import { YtMusicScrapper } from '../../services/scrapper/yt-music.scrapper';

@Injectable()
export class NavigationService {
  constructor(
    @Inject(PUPPETEER_PROVIDER_KEY)
    private readonly puppeteerService: PuppeteerService,
  ) {}

  async queryByText(textCriteria: string) {
    const scrapper = new YtMusicScrapper(await this.puppeteerService.newPage());

    await scrapper.navigateBySearchText(textCriteria, { only: 'songs' });

    const page = await scrapper.getPage();

    // For testing, save content and return
    const r = page.content();

    await page.close();

    return r;
  }
}
