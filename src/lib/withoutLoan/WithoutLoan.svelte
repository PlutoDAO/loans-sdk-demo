<script lang="ts">
  import GetLoan from './GetLoan.svelte';
  import LoanResult from './LoanResult.svelte';
  import SendLoan from './SendLoan.svelte';
  import GetLoanIntentSnippet from './snippets/GetLoanIntentSnippet.svelte';
  import { loanXdr } from './store';
</script>

<div class="container">
  <GetLoan />
  <hr class="solid" />
  {#if $loanXdr}
    <LoanResult />
    <hr class="solid" />
    <SendLoan />
  {/if}
  <GetLoanIntentSnippet />
</div>

<style>
  .container {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
  }

  .solid {
    width: 100%;
    border-top: 1px solid #bbb;
  }
</style>
