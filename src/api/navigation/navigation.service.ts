import { Inject, Injectable } from '@nestjs/common';
import { PuppeteerService } from '../../providers/puppeteer/puppeteer.service';
import { PUPPETEER_PROVIDER_KEY } from '../../providers/puppeteer/puppeteer.module';

@Injectable()
export class NavigationService {
  constructor(
    @Inject(PUPPETEER_PROVIDER_KEY)
    private readonly puppeteerService: PuppeteerService,
  ) {}
  async queryByText(textCriteria: string) {
    const page = await this.puppeteerService.newPage();
    page.goto(
      `https://music.youtube.com/search?q=${encodeURIComponent(textCriteria)}`,
    );
  }
}
