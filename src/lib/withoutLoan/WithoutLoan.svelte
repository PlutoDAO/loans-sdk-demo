<script lang="ts">
  import {
    BalanceDto,
    LoanAssetRequest,
    getLoanIntent,
    sendLoan,
  } from 'pluto-loans-sdk';

  import SimpleSigner from '../simple-signer/SimpleSigner';
  import server from '../stellar/server';
  import { borrower } from '../verifyAccount/store';
  import { signedXdr } from './store';

  let amount: number;
  let loanXdr: string;

  function getAccountXlmBalance() {
    for (const asset of $borrower.balance) {
      if (asset.code === 'native') {
        return asset.balance;
      }
    }

    throw new Error();
  }

  async function handleGetLoan() {
    const asset = new LoanAssetRequest(true);
    const entryBalance = new BalanceDto(asset, `${amount}`);
    loanXdr = await getLoanIntent(server, $borrower.publicKey, entryBalance);
    SimpleSigner.sign(loanXdr);
  }

  async function handleSendLoan() {
    const response = await sendLoan(server, $borrower.publicKey, $signedXdr);
    console.log(response);
  }

  $: if ($signedXdr) {
    (async () => {
      await handleSendLoan();
    })();
  }
</script>

<div class="container">
  <h4>Get Loan intent</h4>

  {#if $borrower}
    <div>
      <p>{`XLM in account ${getAccountXlmBalance()}`}</p>
      <label>
        <p>Amount:</p>
        <input type="number" bind:value={amount} />
      </label>
      <button on:click={handleGetLoan}>Get loan</button>
    </div>
  {/if}
</div>

<style>
  .container {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
