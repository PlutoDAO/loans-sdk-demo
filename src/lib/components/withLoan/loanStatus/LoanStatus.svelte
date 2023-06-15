<script lang="ts">
  import { loanStatus } from './store';

  let isLoading = false;
  let error = '';
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

{#if isLoading}
  Loading...
{/if}

{#if $loanStatus && !isLoading}
  <div class="status-container">
    <p class="soft-text">
      Percentage Paid:
      <span class="strong-text">
        {$loanStatus.percentagePaid}%
      </span>
    </p>
    <p class="soft-text">
      Remaining Debt: <span class="strong-text">{$loanStatus.remainingDebt}</span>
    </p>
    <p class="soft-text">
      yUSDC in Vault: <span class="strong-text">
        {$loanStatus.userTotalYusdcInVault}
      </span>
    </p>
  </div>
{/if}

{#if error && !isLoading}
  <p>{error}</p>
{/if}

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
