import type { ApiStellarNetwork } from 'pluto-loans-sdk';
import { Keypair } from 'stellar-sdk';

export default class Stellar {
  static server: ApiStellarNetwork = 'testnet';

  static generateRandomKeypair(): Keypair {
    return Keypair.random();
  }

  static async fundAccount(pair: Keypair) {
    await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`);
  }
}
