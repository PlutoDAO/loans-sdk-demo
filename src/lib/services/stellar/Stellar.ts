import type { ApiStellarNetwork } from 'pluto-loans-sdk';
import {
  Asset,
  Keypair,
  Networks,
  Operation,
  Server,
  Transaction,
  TransactionBuilder,
  xdr,
} from 'stellar-sdk';

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

  static async createTransaction(
    accountSecretKey: string,
    operations: xdr.Operation[],
  ): Promise<Transaction> {
    const MAX_TIMEOUT = 30;

    const server = new Server(Stellar.serverUrl);
    const keypair = Keypair.fromSecret(accountSecretKey);
    const account = await server.loadAccount(keypair.publicKey());

    const txBuilder = new TransactionBuilder(account, {
      fee: (await server.fetchBaseFee()).toString(),
      networkPassphrase: Stellar.networkPassphrase,
    });

    for (const operation of operations) {
      txBuilder.addOperation(operation);
    }

    txBuilder.setTimeout(MAX_TIMEOUT);
    const tx = txBuilder.build();
    tx.sign(keypair);
    return tx;
  }

  static async submitTransaction(transaction: Transaction): Promise<void> {
    const server = new Server(Stellar.serverUrl);
    await server.submitTransaction(transaction);
  }

  static createPaymentOperation(
    assetCode: string,
    assetIssuerPublicKey: string,
    amount: string,
    destinationPublicKey: string,
  ): xdr.Operation {
    return Operation.payment({
      destination: destinationPublicKey,
      asset: new Asset(assetCode, assetIssuerPublicKey),
      amount,
    });
  }

  static async getVaultAccountFromBorrower(borrowerPublicKey: string): Promise<string | null> {
    const server = new Server(Stellar.serverUrl);
    const accounts = await server.accounts().forSigner(borrowerPublicKey).call();

    const vaultAccount = accounts.records.find((account) => {
      let hasZeroSignWeight = false;
      account.signers.forEach((signer) => {
        if (signer.key === account.id && signer.weight === 0) {
          hasZeroSignWeight = true;
        }
      });
      return hasZeroSignWeight;
    });

    return vaultAccount ? vaultAccount.id : null;
  }
}
