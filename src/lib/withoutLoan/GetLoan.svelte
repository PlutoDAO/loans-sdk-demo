<script lang="ts">
  import { loanAmount } from '../verifyAccount/store';
  import { error } from './store';

  export let balance: string;
  export let handleGetLoan: () => void;
</script>

<h4>Get Loan intent</h4>

<div class="loan-intent-container">
  <p>{`XLM in account ${balance}`}</p>

  <label>
    <p>Amount in XLM:</p>
    <input type="number" bind:value={$loanAmount} />
  </label>

  <button on:click={handleGetLoan} disabled={$loanAmount ? false : true}>
    <p>Get loan</p>
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
