import { Observable, delay, map } from 'rxjs';
import { Saga, ofType } from '@nestjs/cqrs';

import { AccountsModel } from '@app/entities/accounts';
import { Injectable } from '@nestjs/common';
import { PhoneVerifiedEvent } from '../events/phone.verified.event';

@Injectable()
export class PhoneVerifiedSaga {
  constructor(private readonly accounts: AccountsModel) {}

  @Saga()
  onEvent(events$: Observable<PhoneVerifiedEvent>): Observable<Promise<void>> {
    return events$.pipe(
      ofType(PhoneVerifiedEvent),
      delay(500),
      map(async (event) => {
        await this.accounts.deleteAllUnverifiedPhone(event.data.phoneVerified);
      }),
    );
  }
}
