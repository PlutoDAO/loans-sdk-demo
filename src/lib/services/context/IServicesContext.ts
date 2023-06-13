import type * as loansSdk from 'pluto-loans-sdk';

import type SimpleSigner from '../simple-signer/SimpleSigner';

export default interface IServicesContext {
  stellar: loansSdk.ApiStellarNetwork;
  simpleSigner: typeof SimpleSigner;
  loansSdk: typeof loansSdk;
}
