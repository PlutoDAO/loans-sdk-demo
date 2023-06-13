<script lang="ts">
  import { Circle } from 'svelte-loading-spinners';

  import { getContext } from '../services/context';
  import { signedXdr } from '../services/simple-signer/store';
  import { borrower, loanAmount } from '../verifyAccount/store';
  import GetLoan from './GetLoan.svelte';
  import LoanResult from './LoanResult.svelte';
  import SendLoan from './SendLoan.svelte';
  import GetLoanIntentSnippet from './snippets/GetLoanIntentSnippet.svelte';
  import { error, loanXdr } from './store';

  const loansSdk = getContext('loansSdk');
  const server = getContext('stellar');
  let isLoading = false;
  let balance = getAccountXlmBalance();

  function getAccountXlmBalance() {
    for (const asset of $borrower.balance) {
      if (asset.code === 'native') {
        return asset.balance;
      }
    }

    throw new Error();
  }

  async function handleGetLoan() {
    try {
      const asset = new loansSdk.LoanAssetRequest(true);
      const entryBalance = new loansSdk.BalanceDto(asset, `${$loanAmount}`);
      isLoading = true;
      clearStores();
      $loanXdr = await loansSdk.getLoanIntent(server, $borrower.publicKey, entryBalance);
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        $error = `Error status ${parsedError.status}: ${parsedError.detail}`;
      }
    } finally {
      isLoading = false;
    }
  }

  async function handleSendLoan() {
    if (isLoading) {
      return;
    }

    isLoading = true;

    try {
      const response = await loansSdk.sendLoan(server, $borrower.publicKey, $signedXdr);

      if (response) {
        $signedXdr = '';
        $loanXdr = '';
        $borrower.hasLoan = true;
      } else {
        $error = `Couldn't get the loan`;
      }
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        $error = `Error status ${parsedError.status}: ${parsedError.detail}`;
      }
    } finally {
      isLoading = false;
    }
  }

  function clearStores() {
    $loanXdr = '';
    $error = '';
    $signedXdr = '';
  }
</script>

<div class="without-loan-container">
  <h4 class="get-loan-title">Get a loan with XLM</h4>
  <hr class="solid" />
  <GetLoan balance={balance} handleGetLoan={handleGetLoan} />
  {#if isLoading}
    <Circle size="20" color="black" />
  {/if}

  {#if $loanXdr}
    <h4 class="get-loan-title">Result</h4>
    <hr class="solid" />
    <LoanResult />
    <h4 class="get-loan-title">Send the signed XDR</h4>
    <hr class="solid" />
    <SendLoan handleSendLoan={handleSendLoan} />
  {/if}
  <GetLoanIntentSnippet />
</div>

<style>
  .without-loan-container {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
  }

  .solid {
    width: 100%;
    border-top: 1px solid #bbb;
    margin: 5px 0 15px 0;
  }

  .get-loan-title {
    text-align: center;
    width: 100%;
    font-weight: 500;
    margin-top: 20px;
  }
</style>
