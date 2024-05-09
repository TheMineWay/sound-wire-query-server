import { Page } from 'puppeteer';

export class YtMusicScrapper {
  constructor(private readonly page: Page) {}

  async getPage() {
    return this.page;
  }

  async acceptTerms() {
    // We might need to accept terms
    const acceptBtn = await this.page.$('button[aria-label="Accept all"]');
    if (acceptBtn) {
      await acceptBtn.click();
      await this.page.waitForNetworkIdle();
    }
  }

  async navigateBySearchText(text: string) {
    // Loaded page
    await this.page.goto(
      `https://music.youtube.com/search?q=${encodeURIComponent(text)}`,
    );
    await this.page.waitForNetworkIdle();
    // Page is loaded
  }
}
