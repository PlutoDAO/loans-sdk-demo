<script lang="ts">
  import SectionTitle from '../../SectionTitle.svelte';
  import { isStatusLoading, loanStatus } from './store';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism_okaidia.css"
  />
</svelte:head>

<SectionTitle title="Loan Status" />
<div class="status-container">
  <p class="soft-text">
    Percentage Paid:
    <span class="strong-text" data-cy="percentage-paid">
      {!$isStatusLoading ? `${$loanStatus.percentagePaid}%` : 'Loading...'}
    </span>
  </p>
  <p class="soft-text">
    Remaining Debt:
    <span class="strong-text" data-cy="remaining-debt">
      {!$isStatusLoading ? $loanStatus.remainingDebt : 'Loading...'}
    </span>
  </p>
  <p class="soft-text" data-cy="vault-total-yusdc">
    yUSDC in Vault: <span class="strong-text">
      {!$isStatusLoading ? $loanStatus.userTotalYusdcInVault : 'Loading...'}
    </span>
  </p>
</div>

<style>
  .strong-text {
    color: var(--strong-text);
    font-weight: 600;
  }

  .soft-text {
    color: var(--soft-text);
  }

  .status-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
</style>
