import { AppController } from '@serv.odin/app.controller';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';

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
    it('Succeed', () => {
      expect(appController.getStatus()).toEqual({
        status: 'ok',
      });
    });
  });
});