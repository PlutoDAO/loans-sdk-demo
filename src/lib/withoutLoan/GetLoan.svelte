<script lang="ts">
  import { BalanceDto, LoanAssetRequest, getLoanIntent } from 'pluto-loans-sdk';
  import { Circle } from 'svelte-loading-spinners';

  import server from '../stellar/server';
  import { borrower } from '../verifyAccount/store';
  import { error, loanXdr, signedXdr } from './store';

  let amount: number;
  let isLoading = false;

  function getAccountXlmBalance() {
    for (const asset of $borrower.balance) {
      if (asset.code === 'native') {
        return asset.balance;
      }
    }

    throw new Error();
  }

  async function handleGetLoan() {
    try {
      const asset = new LoanAssetRequest(true);
      const entryBalance = new BalanceDto(asset, `${amount}`);
      isLoading = true;
      clearStores();
      $loanXdr = await getLoanIntent(server, $borrower.publicKey, entryBalance);
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        $error = `Error status ${parsedError.status}: ${parsedError.detail}`;
      }
    } finally {
      isLoading = false;
    }
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
    <p>Amount in XLM:</p>
    <input type="number" bind:value={amount} />
  </label>

  <button on:click={handleGetLoan} disabled={amount ? false : true}>
    {#if isLoading}
      <Circle size="20" color="black" />
    {:else}
      <p>Get loan</p>
    {/if}
  </button>

  {#if $error}
    <p>{$error}</p>
  {/if}
</div>

<style>
  .loan-intent-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
</style>
