<script lang="ts">
  import * as loansSdk from 'pluto-loans-sdk';

  const server = 'testnet';
  let borrower = '';
  let statusResponse: loansSdk.LoanStatusResponse;
  let isLoading = false;
  let hasLoan: boolean;

  async function getLoanStatus() {
    isLoading = true;

    try {
      statusResponse = await loansSdk.getLoanStatus(server, borrower);

      if ('status' in statusResponse && statusResponse.status === 404) {
        hasLoan = false;
      } else if (statusResponse.percentagePaid !== undefined) {
        hasLoan = true;
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="container">
  <h4>Check the loan status searching by the borrower's stellar account</h4>

  <div class="get-loan-container">
    <label class="get-loan-label">
      <p>Borrower:</p>
      <input
        type="text"
        bind:value={borrower}
        placeholder="GDRKRGDPWSWYQT4OE2GVKB2CBEPLAAXYZ3WYZTE46647YRJO5BAX5L2B"
      />
    </label>
    <button class="submit-btn" on:click={getLoanStatus}>Submit</button>
  </div>

  {#if isLoading}
    Loading...
  {/if}

  {#if hasLoan && !isLoading}
    <div class="status-container">
      <p class="soft-text">
        Percentage Paid:
        <span class="strong-text">
          {statusResponse.percentagePaid}
        </span>
      </p>
      <p class="soft-text">
        Remaining Debt: <span class="strong-text"
          >{statusResponse.remainingDebt}</span
        >
      </p>
      <p class="soft-text">
        yUSDC in Vault: <span class="strong-text">
          {statusResponse.userTotalYusdcInVault}
        </span>
      </p>
    </div>
  {/if}

  {#if statusResponse && !hasLoan}
    Loan not found
  {/if}
</div>

<style>
  .strong-text {
    color: black;
    font-weight: 600;
  }

  .soft-text {
    color: #464545;
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

  .get-loan-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
