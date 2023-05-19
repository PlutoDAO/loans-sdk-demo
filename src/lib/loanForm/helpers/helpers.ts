import type { AccountResponse } from 'stellar-sdk';

import type IAccount from '../IAccount';

export function mapAccountResponse(account: AccountResponse): IAccount {
  if (account.balances[0] && account.balances[0].balance) {
    return {
      publicKey: account.accountId(),
      balance: { xlm: account.balances[0].balance },
    };
  } else {
    throw new Error();
  }
}
