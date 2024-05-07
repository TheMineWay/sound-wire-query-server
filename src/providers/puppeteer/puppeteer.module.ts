import { DynamicModule, Global, Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

export const PUPPETEER_PROVIDER_KEY = 'puppeteer-provider';

@Global()
@Module({})
export class PuppeteerModule {
  static async create(): Promise<DynamicModule> {
    return {
      global: true,
      module: PuppeteerModule,
      providers: [
        {
          provide: PUPPETEER_PROVIDER_KEY,
          useValue: await PuppeteerService.create(),
        },
      ],
      exports: [PUPPETEER_PROVIDER_KEY],
    };
  }
}
