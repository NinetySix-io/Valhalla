import { IEvent } from '@nestjs/cqrs';
import { User } from '@app/rpc/protobuf/users';

export class UserLoggedInEvent implements IEvent {
  constructor(
    public readonly user: User,
    public readonly tokens: {
      accessToken: string;
      refreshToken: string;
    },
  ) {}
}
