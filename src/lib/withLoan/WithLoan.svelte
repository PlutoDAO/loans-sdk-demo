<script>
  import SettleLoan from './SettleLoan.svelte';
  import LoanStatus from './loanStatus/LoanStatus.svelte';
  import LoanStatusCodeSnippet from './loanStatus/LoanStatusCodeSnippet.svelte';
  import { loanStatus } from './loanStatus/store';
</script>

<div class="container">
  <LoanStatus />

  {#if $loanStatus}
    {#if $loanStatus.remainingDebt}
      <SettleLoan />
    {/if}
  {/if}

  <LoanStatusCodeSnippet />
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
