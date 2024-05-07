import { Injectable } from '@nestjs/common';
import { PuppeteerService } from '../../providers/puppeteer/puppeteer.service';

@Injectable()
export class NavigationService {
  constructor(private readonly puppeteerService: PuppeteerService) {}
  async queryByText(textCriteria: string) {
    const page = await this.puppeteerService.newPage();
    page.goto(
      `https://music.youtube.com/search?q=${encodeURIComponent(textCriteria)}`,
    );
  }
}
