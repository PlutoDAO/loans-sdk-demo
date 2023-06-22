import type * as loansSdk from 'pluto-loans-sdk';

import type SimpleSigner from '../simple-signer/SimpleSigner';
import type toast from '../toast';

export default interface IServicesContext {
  app: {
    server: loansSdk.ApiStellarNetwork;
    SimpleSigner: typeof SimpleSigner;
    loansSdk: typeof loansSdk;
    toast: typeof toast;
  };
}
