import { Controller, Get, Query } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { QueryByTextDTO } from '../../dtos/navigation/query-by-text.dto';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get('text')
  async queryByText(@Query() { text }: QueryByTextDTO) {
    return await this.navigationService.queryByText(text);
  }
}
