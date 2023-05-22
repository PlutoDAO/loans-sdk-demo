<script lang="ts">
  import { BalanceDto, LoanAssetRequest, getLoanIntent } from 'pluto-loans-sdk';

  import server from '../stellar/server';
  import { borrower } from '../verifyAccount/store';

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

  {#if loanXdr}
    <p>{loanXdr}</p>
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
