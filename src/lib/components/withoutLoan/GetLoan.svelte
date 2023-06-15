<script lang="ts">
  import SectionBody from '../SectionBody.svelte';
  import { loanAmount } from '../verifyAccount/store';

  export let balance: string;

  const inputProps = {
    type: 'number',
    placeholder: '100',
  };
</script>

<SectionBody title="Get a loan with XLM" bind:value={$loanAmount} inputProps={inputProps}>
  <div slot="prev-input" class="loan-amount-container">
    <div class="account-balance-container">
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
