import * as rx from 'rxjs';

import { Saga, ofType } from '@nestjs/cqrs';

import { AccountsModel } from '@app/entities/accounts';
import { EmailVerifiedEvent } from '../events/email.verified.event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailVerifiedSaga {
  constructor(private readonly accounts: AccountsModel) {}

  @Saga()
  onEvent(
    events$: rx.Observable<EmailVerifiedEvent>,
  ): rx.Observable<Promise<void>> {
    return events$.pipe(
      ofType(EmailVerifiedEvent),
      rx.delay(500),
      rx.map(async (event) => {
        await this.accounts.deleteAllUnverifiedEmails(event.data.emailVerified);
      }),
    );
  }
}
