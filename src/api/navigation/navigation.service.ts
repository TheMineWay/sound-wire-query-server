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

  async querySongsByText(textCriteria: string) {
    const scrapper = new YtMusicScrapper(await this.puppeteerService.newPage());

    await scrapper.navigateBySearchText(textCriteria, { only: 'songs' });

    const page = await scrapper.getPage();
    const songsContainer = await page.$(
      'ytmusic-shelf-renderer > div#contents > ytmusic-responsive-list-item-renderer',
    );

    const songs = songsContainer.evaluate(async (container) => {
      const name = container.querySelector('div.title-column a');
      const artist = container.querySelectorAll(
        'div.secondary-flex-columns a.yt-simple-endpoint',
      );
      return {
        coverUrl: container
          .querySelector('ytmusic-thumbnail-renderer > yt-img-shadow > img')
          ?.getAttribute('src'),
        name: name?.textContent,
        id: name.getAttribute('href').split('=')[1],
        album: {
          name: artist[1].textContent,
          id: artist[1].getAttribute('href').split('/')[1],
        },
        artist: {
          name: artist[0].textContent,
          id: artist[0].getAttribute('href').split('/')[1],
        },
      };
    });

    return songs;
  }
}
