<script lang="ts">
  import CheckLoanStatusSnippet from './CheckLoanStatusSnippet.svelte';
  import SettleDebtSnippet from './SettleDebtSnippet.svelte';
  import WithdrawCollateralSnippet from './WithdrawCollateralSnippet.svelte';
</script>

<section class="snippets">
  <CheckLoanStatusSnippet />
  <WithdrawCollateralSnippet />
  <SettleDebtSnippet />
</section>

<style>
  .snippets {
    margin: 20px 0;
  }
</style>
