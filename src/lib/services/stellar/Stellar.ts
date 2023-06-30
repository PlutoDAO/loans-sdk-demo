import type { ApiStellarNetwork } from 'pluto-loans-sdk';
import { Asset, Keypair, Networks, Operation, Server, TransactionBuilder } from 'stellar-sdk';

export default class Stellar {
  static server: ApiStellarNetwork = 'testnet';
  private static serverUrl = 'https://horizon-testnet.stellar.org';
  private static networkPassphrase = Networks.TESTNET;

  static generateRandomKeypair(): Keypair {
    return Keypair.random();
  }

  static async fundAccount(keypair: Keypair): Promise<void> {
    await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(keypair.publicKey())}`);
  }

  static async sendAssetFromIssuer(
    assetCode: string,
    issuerPublicKey: string,
    issuerSecretKey: string,
    amount: string,
    destinationPublicKey: string,
  ): Promise<void> {
    const MAX_TIMEOUT = 30;

    const server = new Server(Stellar.serverUrl);
    const issuerAccount = await server.loadAccount(issuerPublicKey);

    const tx = new TransactionBuilder(issuerAccount, {
      fee: (await server.fetchBaseFee()).toString(),
      networkPassphrase: Stellar.networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: destinationPublicKey,
          asset: new Asset(assetCode, issuerPublicKey),
          amount,
        }),
      )
      .setTimeout(MAX_TIMEOUT)
      .build();

    tx.sign(Keypair.fromSecret(issuerSecretKey));
    await server.submitTransaction(tx);
  }
}
