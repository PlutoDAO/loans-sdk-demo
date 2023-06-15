<script lang="ts">
  import { getContext } from '../../services/context';
  import { signedXdr } from '../../services/simple-signer/store';
  import SubmitBtn from '../SubmitBtn.svelte';
  import { borrower, loanAmount } from '../verifyAccount/store';
  import GetLoan from './GetLoan.svelte';
  import LoanResult from './LoanResult.svelte';
  import SendLoan from './SendLoan.svelte';
  import GetLoanIntentSnippet from './snippets/GetLoanIntentSnippet.svelte';
  import store from './store';

  const loansSdk = getContext('loansSdk');
  const server = getContext('stellar');
  const xdrPlaceholder = 'AAAAAgAAAABZzPGvncdHP5v4MhkSJFcKj9p5L5Q4SUJ5WttL';
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
      $store.isGettingTheLoan = true;
      clearStores();
      $store.loanXdr = await loansSdk.getLoanIntent(server, $borrower.publicKey, entryBalance);
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        $store.error = `Error status ${parsedError.status}: ${parsedError.detail}`;
      }
    } finally {
      $store.isGettingTheLoan = false;
    }
  }

  async function handleSendLoan() {
    if ($store.isGettingTheLoan) {
      return;
    }

    $store.isGettingTheLoan = true;

    try {
      const response = await loansSdk.sendLoan(server, $borrower.publicKey, $signedXdr);

      if (response) {
        $signedXdr = '';
        $store.loanXdr = '';
        $borrower.hasLoan = true;
      } else {
        $store.error = `Couldn't get the loan`;
      }
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        $store.error = `Error status ${parsedError.status}: ${parsedError.detail}`;
      }
    } finally {
      $store.isGettingTheLoan = false;
    }
  }

  function clearStores() {
    $store.loanXdr = '';
    $store.error = '';
    $signedXdr = '';
  }
</script>

<div class="without-loan-container">
  <GetLoan balance={balance}>
    <SubmitBtn slot="submit-btn" text="Get Loan" onClick={handleGetLoan} isDisable={$loanAmount ? false : true} isLoading={$store.isGettingTheLoan} />
  </GetLoan>

  <LoanResult />

  <SendLoan inputPlaceHolder={xdrPlaceholder}>
    <SubmitBtn slot="submit-btn" text="Send Loan" onClick={handleSendLoan} isLoading={$store.isSendingTheLoan} />
  </SendLoan>

  <GetLoanIntentSnippet />
</div>

<style>
  .without-loan-container {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
  }
</style>
