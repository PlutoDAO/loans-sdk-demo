<script lang="ts">
  import VerifyAccount from '../lib/verifyAccount/VerifyAccount.svelte';
  import { borrower } from '../lib/verifyAccount/store';
  import WithLoan from '../lib/withLoan/WithLoan.svelte';
  import WithoutLoan from '../lib/withoutLoan/WithoutLoan.svelte';
</script>

<div class="container">
  <VerifyAccount />

  {#if $borrower && $borrower.hasLoan}
    <WithLoan />
  {:else if $borrower && !$borrower.hasLoan}
    <WithoutLoan />
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
