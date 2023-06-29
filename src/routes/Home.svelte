<script lang="ts">
  import CodeExamples from '../lib/components/CodeExamples.svelte';
  import { borrower, isUserConnected } from '../lib/components/verifyAccount/store';
  import WithLoan from '../lib/components/withLoan/WithLoan.svelte';
  import WithoutLoan from '../lib/components/withoutLoan/WithoutLoan.svelte';
</script>

<div class="container">
  {#if $isUserConnected && $borrower}
    {#if $borrower.hasLoan}
      <WithLoan />
    {:else if !$borrower.hasLoan}
      <WithoutLoan />
    {/if}
    <CodeExamples />
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
