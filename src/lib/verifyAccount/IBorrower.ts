import type IAsset from './IAsset';

export default interface IBorrower {
  publicKey: string;
  balance: IAsset[];
  hasLoan: boolean;
}
