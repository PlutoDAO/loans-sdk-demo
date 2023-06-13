import { Keypair, xdr } from 'stellar-sdk';

import { publicKey as storePublicKey } from './store';
import { signedXdr as storeSignedXdr } from './store';

export default class SimpleSigner {
  static connect() {
    const simpleSignerUrl = 'https://sign-test.plutodao.finance';

    window.open(`${simpleSignerUrl}/connect`, 'Connect_Window', 'width=360, height=450');

    function handleMessage(e: MessageEvent) {
      if (e.origin !== simpleSignerUrl) {
        return;
      }

      const messageEvent = e.data;

      if (messageEvent.type === 'onConnect') {
        const publicKey = messageEvent.message.publicKey;
        if (Keypair.fromPublicKey(publicKey)) {
          storePublicKey.set(publicKey);
        }
      }
    }

    window.addEventListener('message', handleMessage);
  }

  static sign(unsignedXdr: string) {
    const simpleSignerUrl = 'https://sign-test.plutodao.finance';

    window.open(`${simpleSignerUrl}/sign?xdr=${unsignedXdr}`, 'Sign_Window', 'width=360, height=700');

    async function handleMessage(e: MessageEvent) {
      if (e.origin !== simpleSignerUrl) {
        return;
      }

      if (e.data.type === 'onSign' && e.data.page === 'sign') {
        const eventMessage = e.data;
        const signedXdr = eventMessage.message.signedXDR;

        if (xdr.TransactionEnvelope.validateXDR(signedXdr, 'base64')) {
          storeSignedXdr.set(signedXdr);
        }
      }
    }
    window.addEventListener('message', handleMessage);
  }
}
