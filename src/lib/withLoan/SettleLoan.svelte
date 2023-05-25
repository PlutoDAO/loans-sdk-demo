<script lang="ts">
  import {
    LoanAssetRequest,
    getSettleDebtIntent,
    sendWithdrawCollateral,
  } from 'pluto-loans-sdk';

  import SimpleSigner from '../simple-signer/SimpleSigner';
  import server from '../stellar/server';
  import { borrower } from '../verifyAccount/store';
  import { signedXdr } from '../withoutLoan/store';

  let unsignedXdr: string;

  async function handleSettleDebt() {
    const asset = new LoanAssetRequest(
      false,
      'pUSD',
      'GBMUBDMUOSN6LMB6X2YREGIFEJRXVYOVL6EV3LGRVPQ5KPJZO5E644I4',
    );

    unsignedXdr = await getSettleDebtIntent(server, $borrower.publicKey, asset);
  }

  async function handleSignTx() {
    $signedXdr = '';
    SimpleSigner.sign(unsignedXdr);
  }

  async function handleSendXdr() {
    const result = await sendWithdrawCollateral(
      server,
      $borrower.publicKey,
      $signedXdr,
    );

    console.log(result);
  }
</script>

<div>
  <button on:click={handleSettleDebt}>Settle debt</button>

  {#if unsignedXdr}
    <button on:click={handleSignTx}>Sign with simple signer</button>
  {/if}

  {#if $signedXdr}
    <button on:click={handleSendXdr}>Send signed XDR</button>
  {/if}
</div>
