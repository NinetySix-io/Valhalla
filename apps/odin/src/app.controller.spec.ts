import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@odin/app.controller';
import { AppService } from '@odin/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toEqual({
        message: 'Hello World',
      });
    });
  });
});
