<script lang="ts">
  import { getContext } from '../../services/context';
  import { signedXdr } from '../../services/simple-signer/store';
  import SectionTitle from '../SectionTitle.svelte';
  import SubmitBtn from '../SubmitBtn.svelte';
  import { borrower, loanAmount } from '../verifyAccount/store';
  import GetLoan from './GetLoan.svelte';
  import LoanResult from './LoanResult.svelte';
  import SendLoan from './SendLoan.svelte';
  import GetLoanIntentSnippet from './snippets/GetLoanIntentSnippet.svelte';
  import store from './store';

  const loansSdk = getContext('loansSdk');
  const server = getContext('stellar');
  const toast = getContext('toast');
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
    toast.loading('Fetching XDR...');
    clearStores();

    if (!$loanAmount) {
      toast.error('Loan amount is required.');
      return;
    }

    try {
      const asset = new loansSdk.LoanAssetRequest(true);
      const entryBalance = new loansSdk.BalanceDto(asset, `${$loanAmount}`);
      $store.loanXdr = await loansSdk.getLoanIntent(server, $borrower.publicKey, entryBalance);
      toast.success('Success!');
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        $store.error = `Error status ${parsedError.status}: ${parsedError.detail}`;
      }
    }
  }

  async function handleSendLoan() {
    if ($store.isSendingTheLoan) {
      return;
    }

    try {
      await sendLoan();
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        toast.error(`Error status ${parsedError.status}: ${parsedError.detail}`);
      }
    } finally {
      $store.isSendingTheLoan = false;
    }

    async function sendLoan() {
      const response = await loansSdk.sendLoan(server, $borrower.publicKey, $signedXdr);
      $store.isSendingTheLoan = true;

      if (response) {
        toast.success('Success!');
        $borrower.hasLoan = true;
      } else {
        toast.error(`Couldn't get the loan`);
      }
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
    <SubmitBtn slot="submit-btn" text="Get Loan" onClick={handleGetLoan} />
  </GetLoan>

  <SectionTitle title="Result" />
  <LoanResult />

  <SectionTitle title="Send the signed XDR" />
  <SendLoan inputPlaceHolder={xdrPlaceholder}>
    <SubmitBtn slot="submit-btn" text="Send Loan" onClick={handleSendLoan} />
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
