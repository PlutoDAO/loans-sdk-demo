<script lang="ts">
  import SectionBody from '../SectionBody.svelte';
  import { loanAmount } from './store';

  export let balance: string;
</script>

<SectionBody title="Get a loan with XLM">
  <input slot="input-label" bind:value={$loanAmount} type="number" placeholder={'100'} />

  <div slot="prev-input" class="loan-amount-container">
    <div class="account-balance-container" data-cy="account-balance">
      <p class="text-light">{`Available: `}</p>
      <p class="text-heavy">{`${balance} XLM`}</p>
    </div>
  </div>

  <slot name="submit-btn" slot="post-input" />
</SectionBody>

<style>
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
