import { Page } from 'puppeteer';

export class YtMusicScrapper {
  constructor(private readonly page: Page) {}

  async navigate(path: string) {
    await this.page.goto(`https://music.youtube.com/${path}`);
    await this.page.waitForNetworkIdle();

    await this.acceptTerms();
  }

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

  async navigateBySearchText(text: string, options: { only?: 'songs' } = {}) {
    // Loaded page
    await this.navigate(`search?q=${encodeURIComponent(text)}`);
    // Page is loaded

    switch (options.only) {
      case 'songs':
        // Click on only songs filter

        const actions = await this.page.$$(
          'div.gradient-box.style-scope.ytmusic-chip-cloud-chip-renderer > a',
        );
        const songsFilterAction = (
          await Promise.all(
            actions.map((a) =>
              a.$('yt-formatted-string > span.style-scope.yt-formatted-string'),
            ),
          )
        ).find(
          async (a) =>
            (await a.evaluate(async (el) => el.textContent)).toLowerCase() ===
            'songs',
        );
        await songsFilterAction.click();
        await this.page.waitForNetworkIdle();
        break;
    }
  }
}
