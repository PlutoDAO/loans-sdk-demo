import type { AccountResponse } from 'stellar-sdk';

import type IAsset from '../IAsset';
import type IBorrower from '../IBorrower';

export function mapAccountResponse(account: AccountResponse): IBorrower {
  const assets: IAsset[] = [];
  let hasLoan = false;

  for (const balance of account.balances) {
    if (
      balance.asset_type === 'credit_alphanum4' ||
      balance.asset_type === 'credit_alphanum12'
    ) {
      assets.push({ code: balance.asset_code, balance: balance.balance });
    } else {
      assets.push({ code: balance.asset_type, balance: balance.balance });
    }
  }

  for (const asset of assets) {
    if (asset.code === 'pUSD') {
      hasLoan = true;
    }
  }

  return { publicKey: account.accountId(), balance: assets, hasLoan };
}
