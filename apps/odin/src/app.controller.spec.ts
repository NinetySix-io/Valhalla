import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '@odin/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('Succeed', async () => {
      expect(appController.getStatus()).toEqual({
        status: 'ok',
      });
    });
  });
});
