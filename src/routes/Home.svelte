<script lang="ts">
  import VerifyAccount from '../lib/verifyAccount/VerifyAccount.svelte';
  import { borrower, isUserConnected } from '../lib/verifyAccount/store';
  import WithLoan from '../lib/withLoan/WithLoan.svelte';
  import WithoutLoan from '../lib/withoutLoan/WithoutLoan.svelte';
</script>

<div class="container">
  <VerifyAccount />

  {#if $isUserConnected && $borrower}
    {#if $borrower.hasLoan}
      <WithLoan />
    {:else if !$borrower.hasLoan}
      <WithoutLoan />
    {/if}
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
</style>
