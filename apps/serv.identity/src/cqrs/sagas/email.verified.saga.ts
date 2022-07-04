import { Observable, delay, map } from 'rxjs';
import { Saga, ofType } from '@nestjs/cqrs';

import { AccountsModel } from '@app/entities/accounts';
import { EmailVerifiedEvent } from '../events/email.verified.event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailVerifiedSaga {
  constructor(private readonly accounts: AccountsModel) {}

  @Saga()
  onEvent(events$: Observable<EmailVerifiedEvent>): Observable<Promise<void>> {
    return events$.pipe(
      ofType(EmailVerifiedEvent),
      delay(500),
      map(async (event) => {
        await this.accounts.deleteAllUnverifiedEmails(event.data.emailVerified);
      }),
    );
  }
}
