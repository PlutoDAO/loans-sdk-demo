<script lang="ts">
  import { getContext } from '../../services/context';
  import { signedXdr } from '../../services/simple-signer/store';
  import ResultXdrSection from '../ResultXdrSection.svelte';
  import SignedXdrSection from '../SignedXdrSection.svelte';
  import SubmitBtn from '../SubmitBtn.svelte';
  import { borrower, loanAmount } from '../verifyAccount/store';
  import GetLoan from './GetLoan.svelte';
  import GetLoanIntentSnippet from './snippets/GetLoanIntentSnippet.svelte';
  import store from './store';

  const loansSdk = getContext('loansSdk');
  const simpleSigner = getContext('simpleSigner');
  const server = getContext('stellar');
  const toast = getContext('toast');

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
    toast.loading('Sending XDR...');
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

  function handleOnSign() {
    simpleSigner.sign($store.loanXdr);
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

  <ResultXdrSection resultXdr={$store.loanXdr} handleOnSign={handleOnSign} />

  <SignedXdrSection actionButtonText="Send loan" handleActionButtonClick={handleSendLoan} />

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
