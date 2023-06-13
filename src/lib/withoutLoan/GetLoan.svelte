<script lang="ts">
  import { loanAmount } from '../verifyAccount/store';
  import { error } from './store';

  export let balance: string;
  export let handleGetLoan: () => void;
</script>

<div class="loan-intent-container">
  <label>
    <div class="loan-amount-container">
      <div class="account-balance-container">
        <p class="text-light">{`Available: `}</p>
        <p class="text-heavy">{`${balance} XLM`}</p>
      </div>
    </div>
    <input type="number" bind:value={$loanAmount} placeholder="100" class="loan-amount-input bg-color" />
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
    gap: 10px;
  }

  .bg-color {
    background-color: #242b3f;
    color: white;
  }

  .loan-amount-input {
    border: none;
  }

  .loan-amount-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }

  .account-balance-container {
    font-size: 10px;
    display: flex;
    align-items: flex-end;
    gap: 5px;
  }

  .text-light {
    font-weight: 300;
  }

  .text-heavy {
    font-weight: 500;
  }
</style>
