import * as rx from 'rxjs';

import { Saga, ofType } from '@nestjs/cqrs';

import { AccountsModel } from '@app/entities/accounts';
import { Injectable } from '@nestjs/common';
import { PhoneVerifiedEvent } from '../events/phone.verified.event';

@Injectable()
export class PhoneVerifiedSaga {
  constructor(private readonly accounts: AccountsModel) {}

  @Saga()
  onEvent(events$: rx.Observable<any>): rx.Observable<Promise<null>> {
    return events$.pipe(
      ofType(PhoneVerifiedEvent),
      rx.delay(500),
      rx.map(async (event) => {
        await this.accounts.deleteAllUnverifiedPhone(event.data.phoneVerified);
        return null;
      }),
    );
  }
}
