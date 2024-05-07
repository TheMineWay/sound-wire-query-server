import { Module } from '@nestjs/common';
import { ApiKeyGuard, ApiKeysModule } from 'nestjs-api-keys';
import { ENV } from './constants/env/env.constant';
import { APP_GUARD } from '@nestjs/core';
import { NavigationModule } from './api/navigation/navigation.module';
import { PuppeteerModule } from './providers/puppeteer/puppeteer.module';

const GLOBAL_PERMISSION = 'query.all';

@Module({
  imports: [
    PuppeteerModule.create(),
    ApiKeysModule.register({
      apiKeys: [
        {
          name: 'For downloading',
          keys: [ENV.API_KEY],
          permissions: [GLOBAL_PERMISSION],
        },
      ],
    }),
    NavigationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard({ permissions: [GLOBAL_PERMISSION] }),
    },
  ],
})
export class AppModule {}
