import type * as loansSdk from 'pluto-loans-sdk';

import type SimpleSigner from '../simple-signer/SimpleSigner';
import type Stellar from '../stellar/Stellar';
import type toast from '../toast';

export default interface IServicesContext {
  appDependencies: {
    Stellar: typeof Stellar;
    SimpleSigner: typeof SimpleSigner;
    loansSdk: typeof loansSdk;
    toast: typeof toast;
  };
}
