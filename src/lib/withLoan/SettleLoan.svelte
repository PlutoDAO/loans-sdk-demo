<script lang="ts">
  import {
    LoanAssetRequest,
    getSettleDebtIntent,
    sendWithdrawCollateral,
  } from 'pluto-loans-sdk';

  import SimpleSigner from '../simple-signer/SimpleSigner';
  import server from '../stellar/server';
  import { getShortenedText } from '../utils/utils';
  import { borrower } from '../verifyAccount/store';
  import { signedXdr } from '../withoutLoan/store';

  let unsignedXdr: string;
  let isXdrInClipboard = false;

  async function handleSettleDebt() {
    const asset = new LoanAssetRequest(
      false,
      'pUSD',
      'GBMUBDMUOSN6LMB6X2YREGIFEJRXVYOVL6EV3LGRVPQ5KPJZO5E644I4',
    );

    unsignedXdr = await getSettleDebtIntent(server, $borrower.publicKey, asset);
  }

  async function handleSendXdr() {
    const result = await sendWithdrawCollateral(
      server,
      $borrower.publicKey,
      $signedXdr,
    );

    if (result) {
      $signedXdr = '';
      $borrower.hasLoan = false;
    }
  }

  function copyXdrToClipboard() {
    navigator.clipboard.writeText(unsignedXdr);
    isXdrInClipboard = true;
  }
</script>

<div>
  <button on:click={handleSettleDebt}>Settle debt</button>

  <hr class="solid" />

  {#if unsignedXdr}
    <div class="result-container">
      <div class="result-xdr-container">
        <p>Result:</p>
        <p>{getShortenedText(unsignedXdr)}</p>
      </div>

      <button on:click={copyXdrToClipboard}>
        {isXdrInClipboard ? 'Copied!' : 'Copy result'}
      </button>

      <button on:click={() => SimpleSigner.sign(unsignedXdr)}>
        Sign with Simple Signer
      </button>

      <label>
        <p>Signed XDR:</p>
        <input type="text" bind:value={$signedXdr} />
      </label>
      <button on:click={handleSendXdr}>Withdraw Collateral</button>
    </div>
  {/if}
</div>

<style>
  .result-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 20px;
  }

  .result-xdr-container {
    background-color: #f9f9f9;
    width: 100%;
  }

  .solid {
    width: 100%;
    border-top: 1px solid #bbb;
  }

  @media (prefers-color-scheme: dark) {
    .result-xdr-container {
      background-color: #181d2a;
    }
  }
</style>
