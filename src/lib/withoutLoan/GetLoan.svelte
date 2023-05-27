<script lang="ts">
  import { BalanceDto, LoanAssetRequest, getLoanIntent } from 'pluto-loans-sdk';

  import server from '../stellar/server';
  import { borrower } from '../verifyAccount/store';
  import { error, loanXdr, signedXdr } from './store';

  let amount: number;

  function getAccountXlmBalance() {
    for (const asset of $borrower.balance) {
      if (asset.code === 'native') {
        return asset.balance;
      }
    }

    throw new Error();
  }

  async function handleGetLoan() {
    clearStores();
    const asset = new LoanAssetRequest(true);
    const entryBalance = new BalanceDto(asset, `${amount}`);
    $loanXdr = await getLoanIntent(server, $borrower.publicKey, entryBalance);
  }

  function clearStores() {
    $loanXdr = '';
    $error = '';
    $signedXdr = '';
  }
</script>

<h4>Get Loan intent</h4>

<div class="loan-intent-container">
  <p>{`XLM in account ${getAccountXlmBalance()}`}</p>
  <label>
    <p>Amount:</p>
    <input type="number" bind:value={amount} />
  </label>
  <button on:click={handleGetLoan}>Get loan</button>
</div>

<style>
  .loan-intent-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
</style>
