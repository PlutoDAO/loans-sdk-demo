<script lang="ts">
  import SectionTitle from '../components/SectionTitle.svelte';
  import SubmitBtn from '../components/SubmitBtn.svelte';
  import { getContext } from '../services/context';
  import { signedXdr } from '../services/simple-signer/store';
  import { borrower, loanAmount } from '../verifyAccount/store';
  import GetLoan from './GetLoan.svelte';
  import LoanResult from './LoanResult.svelte';
  import SendLoan from './SendLoan.svelte';
  import GetLoanIntentSnippet from './snippets/GetLoanIntentSnippet.svelte';
  import { error, isGettingTheLoan, isSendingTheLoan, loanXdr } from './store';

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
      $isGettingTheLoan = true;
      clearStores();
      $loanXdr = await loansSdk.getLoanIntent(server, $borrower.publicKey, entryBalance);
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        $error = `Error status ${parsedError.status}: ${parsedError.detail}`;
      }
    } finally {
      $isGettingTheLoan = false;
    }
  }

  async function handleSendLoan() {
    if ($isGettingTheLoan) {
      return;
    }

    $isGettingTheLoan = true;

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
      $isGettingTheLoan = false;
    }
  }

  function clearStores() {
    $loanXdr = '';
    $error = '';
    $signedXdr = '';
  }
</script>

<div class="without-loan-container">
  <SectionTitle title="Get a loan with XLM" />
  <GetLoan balance={balance}>
    <SubmitBtn slot="submit-btn" text="Get Loan" onClick={handleGetLoan} isDisable={$loanAmount ? false : true} isLoadingStore={isGettingTheLoan} />
  </GetLoan>

  <SectionTitle title="Result" />
  <LoanResult />

  <SectionTitle title="Send the signed XDR" />
  <SendLoan inputPlaceHolder={xdrPlaceholder}>
    <SubmitBtn slot="submit-btn" text="Send Loan" onClick={handleSendLoan} isLoadingStore={isSendingTheLoan} />
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
