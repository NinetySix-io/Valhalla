import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('Landing API')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get Application Heartbeat' })
  getStatus() {
    return {
      status: 'ok',
    };
  }
}
