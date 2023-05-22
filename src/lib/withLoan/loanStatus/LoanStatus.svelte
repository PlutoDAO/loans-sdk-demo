<script lang="ts">
  import { LoanStatusResponse, getLoanStatus } from 'pluto-loans-sdk';

  import server from '../../stellar/server';
  import LoanStatusCodeSnippet from './LoanStatusCodeSnippet.svelte';

  let loanStatus: LoanStatusResponse | undefined;
  let isLoading = false;
  let borrower = '';
  let error = '';

  async function handleGetLoanStatus() {
    isLoading = true;
    loanStatus = undefined;
    error = '';

    try {
      loanStatus = await getLoanStatus(server, borrower);
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);

        if (parsedError.type === 'LOAN_NOT_FOUND') {
          error = 'Loan not found';
        } else {
          error = parsedError.detail;
        }
      }
    } finally {
      isLoading = false;
    }
  }
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

<div class="container">
  <h4>Search by the borrower's stellar account to know the loan status</h4>

  <div class="get-loan-container">
    <label>
      <p>Borrower:</p>
      <input
        type="text"
        bind:value={borrower}
        placeholder="GDRKRGDPWSWYQT4OE2GVKB2CBEPLAAXYZ3WYZTE46647YRJO5BAX5L2B"
      />
    </label>
    <button class="submit-btn" on:click={handleGetLoanStatus}>Submit</button>
  </div>

  {#if isLoading}
    Loading...
  {/if}

  {#if loanStatus && !isLoading}
    <div class="status-container">
      <p class="soft-text">
        Percentage Paid:
        <span class="strong-text">
          {loanStatus.percentagePaid}
        </span>
      </p>
      <p class="soft-text">
        Remaining Debt: <span class="strong-text"
          >{loanStatus.remainingDebt}</span
        >
      </p>
      <p class="soft-text">
        yUSDC in Vault: <span class="strong-text">
          {loanStatus.userTotalYusdcInVault}
        </span>
      </p>
    </div>
  {/if}

  {#if error && !isLoading}
    <p>{error}</p>
  {/if}

  <LoanStatusCodeSnippet />
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

  .submit-btn {
    height: 35px;
    background-color: #6724cf;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .get-loan-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .container {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
