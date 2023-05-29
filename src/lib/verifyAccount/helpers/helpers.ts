import { type AccountResponse, Server } from 'stellar-sdk';

import LocalStorage from '../../../lib/storage/LocalStorage';
import type IAsset from '../IAsset';
import type IBorrower from '../IBorrower';

const storage = new LocalStorage();
const server = new Server('https://horizon-testnet.stellar.org');

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
    if (asset.code === 'lCOLLATERAL') {
      hasLoan = true;
    }
  }

  return { publicKey: account.accountId(), balance: assets, hasLoan };
}

export function storeBorrower(publicKey: string) {
  storage.storeItem('borrower', publicKey);
}

export async function getBorrowerFromStellarAccount(publicKey: string) {
  const borrower = mapAccountResponse(await server.loadAccount(publicKey));
  storeBorrower(borrower.publicKey);

  return borrower;
}

export async function verifyBorrowerConnection() {
  const borrower = storage.getItem('borrower');

  if (borrower) {
    return await getBorrowerFromStellarAccount(borrower);
  } else {
    return;
  }
}

export function removeBorrower() {
  storage.removeItem('borrower');
}
