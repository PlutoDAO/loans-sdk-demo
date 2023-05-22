<script>
  import SettleLoan from './SettleLoan.svelte';
  import WithdrawCollateral from './WithdrawCollateral.svelte';
  import LoanStatus from './loanStatus/LoanStatus.svelte';
  import { loanStatus } from './loanStatus/store';
</script>

<LoanStatus />

{#if $loanStatus.remainingDebt}
  <SettleLoan />
{:else if !$loanStatus.remainingDebt}
  <WithdrawCollateral />
{/if}
