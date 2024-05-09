import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import { ENV } from '../../constants/env/env.constant';

@Injectable()
export class PuppeteerService implements OnApplicationShutdown {
  constructor(private readonly browser: Browser) {}

  async newPage() {
    const page = await this.browser.newPage();

    // Emulate we are not a Chromium instance
    await page.setExtraHTTPHeaders({
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
    });
    return page;
  }

  // Static
  public static async create() {
    const args = ['--no-sandbox'];

    if (ENV.PROXY_URL && ENV.PROXY_URL.length >= 1) {
      args.push(`--proxy-server=${ENV.PROXY_URL}`);
      Logger.log(`Proxy server detected (${ENV.PROXY_URL})`, 'Puppeteer');
    }

    return new PuppeteerService(
      await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args,
      }),
    );
  }

  // Shutdown
  async onApplicationShutdown() {
    await this.browser.close();
  }
}
